# Strict Non-Destructive Changes & Side-Effect Warning Rule

## Core Directives:
1. **Zero Unintended Side Effects**:
   - Only modify the exact section, component, or property that the user has explicitly requested to change.
   - Never unilaterally alter, shift, or reformat surrounding or adjacent sections.

2. **Mandatory Advance Notification**:
   - If an addition, offset change, height change, or layout adjustment has the potential to impact another section (e.g. cause overlap, clip headers, change scroll timing, or shift positions), ALWAYS warn the user before or alongside proposing the change:
     > *"If we change this, bring this down, or add this, [Section/Component Name] might be affected because [reason]."*
   - Offer the option to isolate or scope the change so that tokens and previous adjustments are not wasted.

3. **Protect Previous Fine-Tuned Adjustments**:
   - Preserve all previously tuned parameters (e.g. gaps, radii, typography, offsets, alignment) across turns and prevent regressions.
