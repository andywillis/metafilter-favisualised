(function () {

  function qs(selector, context = document) {
    return context.querySelector(selector);
  }

  function qsa(selector, context = document) {
    return context.querySelectorAll(selector);
  }

  function getFavouriteTotal(comment) {
    const link = qs('span[id^="favcnt"] a', comment);
    return link ? link.textContent.match(/^\d+/)[0] : 0;
  }

  function getSite() {
    return document.location.host.split('.')[0];
  }

  function hasSite(site) {
    return [
      'www', 'ask', 'metatalk', 'fanfare',
      'projects', 'music', 'podcast'
    ].includes(site);
  }

  function showVisualCue(comment, favouriteTotal, site) {
    const width = ((favouriteTotal / 2) + 1);
    comment.classList.add('highlight', `${site}color`);
    comment.style.borderLeftWidth = `${width}px`;
    comment.style.marginLeft = `${70 - width}px`;
  }

  function getComments(site) {
    qsa('.comments').forEach(function (comment) {
      const favouriteTotal = getFavouriteTotal(comment);
      if (favouriteTotal > 2) {
        showVisualCue(comment, favouriteTotal, site);
      }
    });
  }

  function init() {
    const site = getSite();
    if (hasSite(site)) getComments(site);
  }

  init();

}());
