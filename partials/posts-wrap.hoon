/=  head  /partials-head/
/=  footer-signup  /partials-footer-signup/
/=  footer-contact  /partials-footer-contact/
/=  menu  /partials-menu/
/=  content  /|  /!elem/  /partials-post/  ==
^-  manx
;html
  ;+  (head "Urbit / Posts")
  ;body
    ;+  menu
    ;div.container.mt-10
      ;div.row.fixed
        ;div.col-sm-12.menu-toggle
          ;img.w-8.h-8@"/assets/menu-open.svg";
        ==
        ;div.col-sm-8.col-md-12.ml-1.mt-3.sm-2
          ;ul.list-reset.h-font
            ;a/"/posts"
              ;li: All
            ==
            ;a/"/posts/updates"
              ;li: Updates
            ==
            ;a/"/posts/essays"
              ;li: Essays
            ==
            ;a/"/posts/media"
              ;li: Media
            ==
          ==
        ==
      ==
      ;div.row.pb-80
        ;div.col-sm-9.col-md-8.col-sm-offset-3.col-md-offset-2
          ;+  content
        ==
      ==
    ==
    ;footer.container.mb-36
      ;div.row
        ;div.col-sm-8.col-sm-offset-3.col-lg-4.col-md-offset-2
          ;+  footer-signup
        ==
      ==
      ;div.row
        ;div.col-sm-6.col-sm-offset-3.col-md-offset-2
          ;+  footer-contact
        ==
      ==
      ;script@"https://code.jquery.com/jquery-3.3.1.slim.min.js";
      ;script@"/js/main.js";
    ==
  ==
==
