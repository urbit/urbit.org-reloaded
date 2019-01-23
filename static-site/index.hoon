/=  head  /partials-head/
/=  footer-signup  /partials-footer-signup/
/=  footer-contact  /partials-footer-contact/
/=  article  /partials-article/
/=  posts
  /:  /===/web/posts/updates
  /^  (map @ta (map knot cord))
  /_  /front/
|%
++  item  $:  file=@ta
              front=(map knot cord)
          ==
--
^-  manx
=/  latest/item
    %+  snag  0
    %+  sort
      ~(tap by posts)
    |=  [b=item c=item]
    %+  gth
      %-  unt:chrono:userlib
      %+  slav
        %da
      (fall (~(get by front.b) %date) (scot %da *@da))
    %-  unt:chrono:userlib
      %+  slav
        %da
    (fall (~(get by front.c) %date) (scot %da *@da))
;html
  ;+  (head "Urbit")
  ;body.container
    ;div.row.mb-6
      ;div.col-sm-10.col-md-6.col-lg-4.col-sm-offset-1.col-md-offset-2
        ;h1.mt-10: Urbit
        A personal server built from scratch
      ==
    ==
    ;div.row
      ;div.col-sm-10.col-md-8.col-lg-4.col-sm-offset-1.col-md-offset-2
        ;+  %^  article
              "Primer"
              "A 10-minute read on what Urbit is and why it exists"
              "/primer"
        ;+  %^  article
              "Posts"
              "Regular updates, occasional essays and media"
              "/posts"
        ;+  %^  article
              "Docs"
              "Installation instructions and complete system documentation"
              "/docs"
      ==
    ==
    ;footer.mb-36
      ;div.row.mv-20
        ;div.col-sm-8.col-sm-offset-1.col-lg-4.col-md-offset-2
          ;+  footer-signup
        ==
      ==
      ;div.row
        ;div.col-sm-6.col-sm-offset-1.col-md-offset-2
          ;+  footer-contact
        ==
      ==
    ==
  ==
==
