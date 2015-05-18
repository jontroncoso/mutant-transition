mutant-transition.js
=====================
Mutant Transition automatically changes style attributes. This allows you to do things like transition from `height: auto` to `height: 0px`. Mutant Transition doesn't require you to use any special js methods to work with. instead it reads changes to the dom and changes the style attributes then. It even detects changes done through "inspect element". 

[> DEMO <](http://jontroncoso.github.io/mutant/)

Mutant Transition leverages [Mutation Observer](http://caniuse.com/#feat=mutationobserver). Because of this, Mutant Transition requires minimal setup.  