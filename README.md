mutant-transition.js
=====================
Mutant Transition automatically sets the style attributes for elements when the DOM changes. This allows you to do things like transition from `height: auto` to `height: 0px`. Mutant Transition doesn't require you to use learn any special javascript to animate elements. Instead, it reads changes to the DOM and changes the style attributes in concert. It even detects changes done through "inspect element". 
 - [Demonstration of transitioning from `height: auto` to `height: 100%`](https://jsfiddle.net/zfwrt1d8/5/)
 - [Demonstration of transitioning of `height: auto` in response to changing children](https://jsfiddle.net/7vj3n5nf/3/)

## Set Up

Mutant Transition leverages [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) ([IE11+](http://caniuse.com/#feat=mutationobserver)). Because of this, Mutant Transition requires minimal setup. You simply add the appropriate data-attributes (`data-mutant-attributes="height,width"`, for example), include my script, ( https://cdn.rawgit.com/jontroncoso/mutant-transition/master/src/mutant-transition.js), and mutant-transition takes care of the rest. As you manipulate the DOM using classes and moving elements around, Mutant Transition quickly makes a copy of the element in the new state and uses those measurements to set the style-attributes (`style="width: 100px; height: 758px`, for example).
```html
<div class="example" data-mutant-attributes="height,width">
            This is an example with mutant-transition
        </div>
```
## Caveats
I came up with this idea a couple weeks ago and kinda threw this together. Consider this a proof of concept for now. I'll go through it later to refactor it so that it is more accessible to the public. It currently requires jquery for selecting and iterating, etc...


### Positioning 
CSS computes a given element using different formulas that are dependant on whats going on, (absolute-positioning, block, inline, etc..). For example, sometimes the padding is calculated as part of the height. Sometimes its considered outside the height. I need to work the different circumstances into this plugin.

### Width
Since, its computing the elements width in pixels, I'd stay away from using width. Especially if you're using responsive design. 