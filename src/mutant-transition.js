if(typeof window.MutationObserver == 'function')
{
  observer = new MutationObserver(function(mutations){
    // The combination of the following 2 lines prevents other, lets call them "threads",
    // from repeatedly calling this code in response to class changes and what have you,
    // resulting in an infinite loop.
    if(observer.ignore == true)return false;
    observer.ignore = true;

    $('.mutant-transition').each(observer.mutate);

    setTimeout(function(){
      observer.ignore = false
    }, 50);
  });
  observer.ignore = false;
  observer.mutate = function(i,mutant){
    var $mutant = $(mutant);
    var $clone;
    var cssAttr = {};

    //console.log($mutant);
    //console.log('BOOM! %o | %o ', $mutant.data('moving'), $mutant.data('mutant-attributes'));
    if(typeof $mutant.data('mutant-attributes') != 'string')return false;

    $clone = $mutant.clone();
    $clone.attr('id', '').addClass('mutant-clone').attr('style', '').insertAfter($mutant);
    $.each($mutant.data('mutant-attributes').split(','), function(i,e){
      var attribute = e.trim();
      var attrMethod = attribute;
      if(attrMethod == 'height' || attrMethod == 'width')attrMethod = $.camelCase('outer-' + attrMethod);
      if(attribute != attrMethod && typeof $clone[attrMethod] == 'function')cssAttr[attribute] = $clone[attrMethod]();
      if(attribute == attrMethod && typeof $clone.css(attrMethod) != 'undefined')cssAttr[attribute] = $clone.css(attrMethod);
    });
    $clone.remove();
    $mutant.css(cssAttr);
  };
  $('.mutant-transition').each(observer.mutate);
  observer.observe(document, {subtree: true,
    attributes: true,
    childList: true,
    characterData: true
  });
}