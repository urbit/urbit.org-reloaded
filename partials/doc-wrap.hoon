/=  head  /partials-head/
/=  footer-contact  /partials-footer-contact/
/=  menu  /partials-menu/
/=  content  /,  /web/docs/learn  /partials-kids-plus/
                 /web/docs/reference  /partials-kids-plus/
                 /web/docs/getting-started  /partials-kids-plus/
                 /web/docs/introduction  /partials-kids-plus/
                 /web/docs  /elem/
             ==

/=  sidebar  /partials-sidebar/
^-  manx
;html
  ;+  (head "Urbit / Docs")
  ;body
    ;+  menu
    ;div.container.mt-10
      ;div.row.fixed.pb-30(style "height:100%")
        ;div.col-sm-3.col-md-12.menu-toggle
          ;img.w-8.h-8@"/assets/menu-open.svg";
        ==
        ;div.overflow-y.col-sm-8.col-lg-12.w-48.sm-hide(style "height:100%")
          ;+  sidebar
        ==
      ==
      ;div.row.pb-80
        ;div.col-sm-9.col-md-8.col-sm-offset-3.col-md-offset-3.docs
          ;+  content
        ==
      ==
    ==
    ;footer.mb-36
      ;script@"https://code.jquery.com/jquery-3.3.1.slim.min.js";
      ;script@"/js/main.js";
    ==
  ==
==
