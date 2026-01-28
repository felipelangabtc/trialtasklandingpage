# A/B Testing & Experiments

This document describes the experimentation framework and active experiments.

## Framework

We use PostHog for A/B testing with client-side variant assignment. This allows:
- Simple implementation without server-side complexity
- Consistent experience across sessions
- Easy experiment creation and analysis

## How It Works

1. **Variant Assignment**: User visits site → variant assigned randomly → stored in `localStorage`
2. **Exposure Tracking**: Variant assignment triggers `experiment_exposure` event
3. **Consistency**: Same variant shown on return visits
4. **Analysis**: PostHog tracks conversions by variant

## Active Experiments

### 1. Headline Test

**Experiment ID**: `headline_test`

**Hypothesis**: A more direct, problem-focused headline will increase conversion rates.

**Variants**:
- `control`: "See street-level risks before you buy"
- `variant_a`: "Stop missing hidden risks on the wrong streets"

**Success Metric**: `lead_form_success` conversion rate

**Traffic Split**: 50/50

**Location**: Home page hero

**Code**:
```typescript
import { getHeadline } from '@/lib/experiments';

const headline = getHeadline(); // Returns variant text
```

**Status**: Active

---

### 2. CTA Button Test

**Experiment ID**: `cta_test`

**Hypothesis**: "Get office access" will appeal to professional users more than "Start free trial".

**Variants**:
- `control`: "Start free trial"
- `variant_a`: "Get office access"

**Success Metric**: `lead_form_success` conversion rate

**Traffic Split**: 50/50

**Location**: All primary CTA buttons (hero, header, sections)

**Code**:
```typescript
import { getCTAText } from '@/lib/experiments';

const ctaText = getCTAText(); // Returns variant text
```

**Status**: Active

---

## How to Create a New Experiment

### 1. Define the Experiment

Add to `lib/experiments.ts`:

```typescript
export const EXPERIMENTS = {
  YOUR_TEST: {
    id: 'your_test_id',
    variants: ['control', 'variant_a', 'variant_b'],
  },
} as const;

export const YOUR_VARIANTS = {
  control: 'Control text',
  variant_a: 'Variant A text',
  variant_b: 'Variant B text',
} as const;
```

### 2. Create Helper Function

```typescript
export function getYourVariant(): string {
  const variant = getVariant(EXPERIMENTS.YOUR_TEST);
  return YOUR_VARIANTS[variant as keyof typeof YOUR_VARIANTS];
}
```

### 3. Use in Component

```typescript
'use client';

import { getYourVariant } from '@/lib/experiments';
import { useEffect, useState } from 'react';

export function YourComponent() {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(getYourVariant());
  }, []);

  return <div>{text}</div>;
}
```

### 4. Track Exposure

Exposure is tracked automatically in `getVariant()` when a variant is assigned.

### 5. Analyze Results

1. Go to PostHog dashboard
2. Create Insight → Funnel
3. Filter by experiment variant
4. Compare conversion rates

## Best Practices

### Variant Assignment
- Assign variants client-side for simplicity
- Store in `localStorage` for consistency
- Track exposure immediately

### Sample Size
- Run experiments until statistical significance (95% confidence)
- Use PostHog's significance calculator
- Minimum 100 conversions per variant

### Experiment Design
- Test one variable at a time
- Have clear hypothesis
- Define success metric before launching
- Set minimum runtime (2 weeks recommended)

### Avoiding Flicker
Currently, variants are assigned client-side which can cause a flash of content. To minimize:
- Keep default variant as `control`
- Apply variants as early as possible (in top-level component)
- For future: Consider server-side variant assignment

## Common Pitfalls

### 1. Not Enough Traffic
**Problem**: Experiment runs for weeks without reaching significance.
**Solution**: Either increase traffic or run for longer.

### 2. Multiple Changes
**Problem**: Changing headline AND CTA text in one experiment.
**Solution**: Test one variable at a time.

### 3. Peeking
**Problem**: Stopping experiment early because variant looks like it's winning.
**Solution**: Wait for statistical significance.

### 4. Selection Bias
**Problem**: Different user segments see different variants.
**Solution**: Ensure random assignment (don't use user properties to assign).

## Ending an Experiment

### 1. Analyze Results
- Check statistical significance
- Compare conversion rates
- Review secondary metrics

### 2. Choose Winner
- If significant difference: Deploy winner
- If no significant difference: Keep control

### 3. Deploy Winner

Replace experiment code with winning variant:

```typescript
// Before
const headline = getHeadline();

// After (if variant_a wins)
const headline = "Stop missing hidden risks on the wrong streets";
```

### 4. Archive Experiment
Document results in this file and remove from active experiments.

## Experiment Log

### Completed Experiments

None yet.

## Integration with PostHog

### Feature Flags (Future)
For more advanced experiments, use PostHog feature flags:
- Server-side variant assignment (no flicker)
- Multivariate testing
- Gradual rollouts
- Target specific user segments

### Session Replay
Review session replays filtered by experiment variant to understand user behavior.

## Analytics Queries

### Conversion Rate by Variant
```
Events: lead_form_success
Breakdown: experiment variant
Filter: experiment_id = "headline_test"
```

### Time to Conversion
```
Events: page_view → lead_form_success
Breakdown: experiment variant
```

### Drop-off Points
```
Funnel:
1. page_view
2. cta_click
3. lead_form_view
4. lead_form_submit
5. lead_form_success

Breakdown: experiment variant
```

## Resources

- PostHog Docs: https://posthog.com/docs/experiments
- Statistical Significance Calculator: https://www.optimizely.com/sample-size-calculator/
- A/B Testing Guide: https://www.optimizely.com/optimization-glossary/ab-testing/
