/**
 * Tracks whether the share menu is visible or not.
 *
 * This variable is used to track whether the share menu is currently visible
 * or not. It is used to determine whether or not to attach an event listener
 * to the document to close the share menu when a click event is triggered
 * outside of the share menu.
 *
 * @type {boolean}
 */
let isShareMenuVisible = false;

/**
 * Initializes the page by loading the article preview template.
 *
 * This function is called when the page is loaded, and is responsible for
 * setting up the page's HTML structure. It delegates to the
 * loadArticlePreviewTemplate function to load the template.
 */
function init() {
  loadArticlePreviewTemplate();
  loadShareMenu();
}

/**
 * Loads the article preview template into the container element.
 *
 * This function selects the element with the id "container" from the DOM.
 * If the element exists, it sets its innerHTML to the value returned by
 * the getArticlePreviewTemplate function, which contains the HTML structure
 * of the article preview.
 */
function loadArticlePreviewTemplate() {
  const articleContainer = document.getElementById("container");
  if (!articleContainer) return;

  articleContainer.innerHTML = getArticlePreviewTemplate();
}

/**
 * Loads the share profile template into the share container element.
 *
 * This function selects the element with the id "profile-share" from the DOM.
 * If the element exists, it sets its innerHTML to the value returned by the
 * getShareProfileTemplate function, which contains the HTML structure of the
 * share profile template.
 */
function loadShareMenu() {
  const shareContainer = document.getElementById("profile-share");
  if (!shareContainer) return;

  shareContainer.innerHTML += getShareProfileTemplate();
}

/**
 * Toggles the visibility of the share menu.
 *
 * This function is called when the user clicks the share button. It toggles the
 * visibility of the share menu and adds or removes an event listener on the
 * document to close the share menu when a click event is triggered outside of
 * the share menu.
 */
function toggleShareMenu() {
  const shareMenuElement = document.getElementById("share-menu");
  if (!shareMenuElement) return;

  shareMenuElement.classList.toggle("d_none");
  isShareMenuVisible = !isShareMenuVisible;

  if (isShareMenuVisible) document.addEventListener("click", closeShareMenuOnClickOutside);
  else document.removeEventListener("click", closeShareMenuOnClickOutside);
}

/**
 * Closes the share menu when the window loses focus.
 *
 * This function is called when the window loses focus. It checks if the share
 * menu is visible and if so, calls toggleShareMenu to close the share menu.
 */
window.addEventListener("blur", () => {
  if (isShareMenuVisible) toggleShareMenu();
});

/**
 * Closes the share menu when a click event is triggered outside of the share
 * menu.
 *
 * This function is called when a click event is triggered anywhere on the
 * document. It checks if the click target is outside of the share menu and
 * its containing elements. If so, it calls toggleShareMenu to close the
 * share menu.
 * @param {Event} event The click event object.
 */
function closeShareMenuOnClickOutside(event) {
  const target = event.target;
  const shareMenu = document.getElementById("share-menu");
  const isClickOutsideShareMenu =
    !shareMenu.contains(target) && target.id !== "share-button" && !target.closest("#share-button svg");
  if (isClickOutsideShareMenu) toggleShareMenu();
}

/**
 * Returns the HTML structure for the article preview component as a string.
 *
 * The HTML structure returned by this function is used to populate the
 * container element when the page is loaded. It includes the image, heading,
 * text, and footer elements that make up the article preview component.
 *
 * @return {string} The HTML structure for the article preview component.
 */
function getArticlePreviewTemplate() {
  return /*html*/ `
    <article class="card" aria-label="Shift the overall look and feel by adding these wonderful touches to furniture in your home">
        <figure class="card-image">
            <img src="./images/drawers.jpg" alt="Green drawer with pictures and a wheat-filled vessel on top" />
        </figure>
        <section class="card-body">
            <header class="card-body-heading">
                <h1>Shift the overall look and feel by adding these wonderful touches to furniture in your home</h1>
            </header>
            <div class="card-body-text">
                <p>Ever been in a room and felt like something was missing? Perhaps it felt slightly bare and uninviting. I've got some simple tips to help you make any room feel complete.</p>
            </div>
            <footer class="card-body-footer">
                <div class="profile-card">
                    <figure class="profile-image">
                        <img src="./images/avatar-michelle.jpg" alt="Profile Image" />
                    </figure>
                    <figcaption class="profile-info">
                        <h2>Michelle Appleton</h2>
                        <time datetime="2020-06-28">28 Jun 2020</time>
                    </figcaption>
                </div>
                <div id="profile-share" class="profile-share">
                    <button type="button" onclick="toggleShareMenu()" id="share-button" class="btn btn-share" aria-label="Share this article">
                        ${getSVGForShareOption("share")}
                    </button>
                </div>
            </footer>
        </section>
    </article>
    `;
}

/**
 * Returns the HTML structure for the share profile component as a string.
 *
 * The HTML structure returned by this function is used to populate the
 * .share-options element when the share button is clicked. It includes
 * the text "SHARE" and the Facebook, Twitter, and Pinterest share options.
 *
 * @return {string} The HTML structure for the share profile component.
 */
function getShareProfileTemplate() {
  return /*html*/ `
        <div id="share-menu" class="share-menu d_none">
            <span class="share-option-text">SHARE</span>
            <a href="https://www.facebook.com/" target="_blank" class="share-option-facebook">${getSVGForShareOption(
              "facebook"
            )}</a>
            <a href="https://x.com/" target="_blank" class="share-option-twitter">${getSVGForShareOption("twitter")}</a>
            <a href="https://pinterest.com/" target="_blank" class="share-option-pinterest">${getSVGForShareOption(
              "pinterest"
            )}</a>
        </div>
    `;
}

/**
 * Returns the SVG markup for a given share option.
 *
 * @param {string} option - The name of the share option (e.g., "facebook", "pinterest", "share", "twitter").
 * @returns {string} - The SVG markup associated with the specified share option.
 *                     Returns an empty string if the option is not recognized.
 */
function getSVGForShareOption(option) {
  const svgMap = {
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path fill="#FFF" d="M18.896 0H1.104C.494 0 0 .494 0 1.104v17.793C0 19.506.494 20 1.104 20h9.58v-7.745H8.076V9.237h2.606V7.01c0-2.583 1.578-3.99 3.883-3.99 1.104 0 2.052.082 2.329.119v2.7h-1.598c-1.254 0-1.496.597-1.496 1.47v1.928h2.989l-.39 3.018h-2.6V20h5.098c.608 0 1.102-.494 1.102-1.104V1.104C20 .494 19.506 0 18.896 0z"/></svg>`,
    pinterest: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path fill="#FFF" d="M10 0C4.478 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S15.522 0 10 0z"/></svg>`,
    share: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="13"><path fill="#6E8098" d="M15 6.495L8.766.014V3.88H7.441C3.33 3.88 0 7.039 0 10.936v2.049l.589-.612C2.59 10.294 5.422 9.11 8.39 9.11h.375v3.867L15 6.495z"/></svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17"><path fill="#FFF" d="M20 2.172a8.192 8.192 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.605.996A4.096 4.096 0 0013.847.248c-2.65 0-4.596 2.472-3.998 5.037A11.648 11.648 0 011.392 1a4.109 4.109 0 001.27 5.478 4.086 4.086 0 01-1.858-.513c-.045 1.9 1.318 3.679 3.291 4.075a4.113 4.113 0 01-1.853.07 4.106 4.106 0 003.833 2.849A8.25 8.25 0 010 14.658a11.616 11.616 0 006.29 1.843c7.618 0 11.922-6.434 11.663-12.205A8.354 8.354 0 0020 2.172z"/></svg>`,
  };

  return svgMap[option] || "";
}
