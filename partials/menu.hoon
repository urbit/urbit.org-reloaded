/=  article  /partials-article/
/=  footer-contact  /partials-footer-contact/

;nav.bg-black.pb-36.menu-hide.overflow-y
  ;div.container
    ;div.row.pt-10.mb-3
      ;div.col-sm-1.menu-toggle
        ;img.w-8.h-8@"/assets/menu-close.svg";
      ==
      ;div.col-sm-9.col-md-8.col-lg-4.col-sm-offset-2.col-md-offset-1.white
        ;+  %^  article
              "Primer"
              ""
              "/primer"
        ;+  %^  article
              "Posts"
              ""
              "/posts"
        ;+  %^  article
              "Docs"
              ""
              "/docs"
      ==
    ==
  ==
  ;footer.container.mb-36.white
    ;div.row
      ;div.col-sm-6.col-sm-offset-3.col-md-offset-2
        ;+  footer-contact
      ==
    ==
  ==
==
