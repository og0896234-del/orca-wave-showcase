<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Strict Non-Destructive Changes & Side-Effect Notification Rule

1. **Scope Boundary**:
   - Only modify the exact section, component, or property explicitly requested by the user.
   - Do NOT modify, reposition, restyle, or refactor any unrequested sections, layout flows, or parameters.

2. **Proactive Side-Effect Warning**:
   - If implementing a requested modification (e.g. altering height, margins, offsets, positioning, z-index, typography, or container hierarchy) could potentially shift, overlap, clip, or alter any adjacent or other section on the page, **proactively inform the user**:
     > *"If we change this, bring this down, or add this, [Section Name] might be affected because [reason]."*
   - Clarify the potential impact and provide options before altering shared styles or page layout.

3. **Protect Fine-Tuned Adjustments**:
   - Preserve all previously tuned parameters (spacing, gaps, alignments, custom fonts, geometry) across turns and prevent repeated regressions.
