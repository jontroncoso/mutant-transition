if(typeof window.MutationObserver == 'function')
{
  window.observer = new MutationObserver(function(mutations){
    // The combination of the following 2 lines prevents other, lets call them "threads",
    // from repeatedly calling this code in response to class changes and what have you,
    // resulting in an infinite loop.
    if(window.observer.ignore == true)return false;
    window.observer.ignore = true;

    $('[data-mutant-attributes]').each(window.observer.mutate);

    setTimeout(function(){
      window.observer.ignore = false
    }, 50);
  });
  window.observer.ignore = false;
  window.observer.mutate = function(i,mutant){
    var $mutant = $(mutant);
    var $clone;
    var cssAttr = {};
    var mutantAttributes = [];

    //console.log($mutant);
    //console.log('BOOM! %o | %o ', $mutant.data('moving'), $mutant.data('mutant-attributes'));
    if(typeof $mutant.data('mutant-attributes') != 'string')return false;

    $clone = $mutant.clone();
    $clone.attr('id', '').addClass('mutant-clone').attr('style', '').insertAfter($mutant);
    mutantAttributes = $mutant.data('mutant-attributes').split(',');
    $.each(mutantAttributes, function(i,e){
      var attribute = e.trim();
      var attrMethod = attribute;
      if((attrMethod == 'height' || attrMethod == 'width') && mutantAttributes.indexOf('padding') !== -1)attrMethod = $.camelCase('outer-' + attrMethod);
      if(attribute != attrMethod && typeof $clone[attrMethod] == 'function')cssAttr[attribute] = $clone[attrMethod]();
      if(attribute == attrMethod && typeof $clone.css(attrMethod) != 'undefined')cssAttr[attribute] = $clone.css(attrMethod);
    });
    $clone.remove();
    $mutant.css(cssAttr);
  };

  $(function(){
    $('[data-mutant-attributes]').each(window.observer.mutate);
    window.observer.observe(document, {
      subtree: true,
      attributes: true,
      childList: true,
      characterData: true
    });
  });


}