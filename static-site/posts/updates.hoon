/=  post-list
  /^  (map @ta (map knot cord))
  /_  /front/
|%
++  item  $:  file=@ta
              front=(map knot cord)
          ==
--
^-  manx
;div.col-sm-10
  ;div
    ;h1.mb-8: Updates
  ==
  ;*  %+  turn
        %+  sort
          ~(tap by post-list)
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
      |=  [file=@ta front=(map knot cord)]
      =/  title  (fall (~(get by front) %title) '')
      =/  date  (fall (~(get by front) %date) '')
      =/  prev  (fall (~(get by front) %preview) '')
      ;div.mb-8
        ;span.h4.mt-0.mb-0.text-mono.text-500.gray-light: {(trip date)}
        ;a/"/posts/updates/{(trip file)}"
          ;h2: {(trip title)}
        ==
        ;p.mt-3: {(trip prev)}
      ==
==
