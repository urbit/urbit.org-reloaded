/=  children-snip
  /:  /===/web/static-site/udon
  /^  (map knot [marl marl])
  /_  /&snip&elem&/udon/
/=  children-front
  /:  /===/web/static-site/udon
  /^  (map @ta (map knot cord))
  /_  /&front&/udon/
/=  head  /partials-head/
/=  footer-signup  /partials-footer-signup/
/=  footer-contact  /partials-footer-contact/
/=  article  /partials-article/
/=  menu  /partials-menu/

;html
  ;+  (head "Urbit / Docs")
  ;body
    ;+  menu
    ;div.container.mt-10
      ;div.row.fixed
        ;div.col-sm-12.menu-toggle
          ;img.w-8.h-8@"/static-site/assets/menu-open.svg";
        ==
      ==
      ;div.row.pb-80
        ;div.col-sm-10.col-md-offset-2.mb-6
          ;h1: Docs
        ==
        ;div.col-sm-10.col-md-8.col-lg-4.col-sm-offset-1.col-md-offset-2
          ;+  %^  article
                "Introduction"
                "Understand how Urbit is different than other systems"
                "/static-site/introduction"
          ;+  %^  article
                "Getting started"
                "Get your machine setup to run Urbit"
                "#"
          ;+  %^  article
                "Learn"
                "Regular updates, ocassional essays and media"
                "#"
          ;+  %^  article
                "Reference"
                "The Urbit dictionary for terminology, definitions, and expressions "
                "#"
        ==
        ;div: {<children-snip>}
        ;div: {<children-front>}
      ==
    ==
    ;footer.container.mb-36
      ;+  footer-signup
      ;+  footer-contact
      ;script@"https://code.jquery.com/jquery-3.3.1.slim.min.js";
      ;script@"../static-site/js/main.js";
    ==
  ==
==
