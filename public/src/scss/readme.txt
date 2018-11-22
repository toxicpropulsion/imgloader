https://medium.com/gusto-design/creating-the-perfect-css-system-fa38f5bcdd9e

Layer definitions for this slightly modified ITCSS structure:

Vendor — files for third party code. At the top to be the most easily overridden
Settings — preprocessors, fonts, variables (doesn’t generate any style output)
Tools — mixins, functions (doesn’t generate any style output)
Generic — resets or normalizing files
Elements — bare HTML elements (H1, a, p, etc…)
Components — Majority of code goes here to style specific UI components
Utilities/Helpers — utilities and helper classes that have the most authority (show/hide, color helpers, etc…)