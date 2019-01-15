/=  post-list
  /^  (map @ta (map knot cord))
  /_  /front/
|%
++  item  $:  file=@ta
              front=(map knot cord)
          ==
--
^-  manx
;ol
  ;*  %+  turn
        %+  sort
          ~(tap by post-list)
        |=  [a=item b=item]
        =/  sort-a  (fall (~(get by front.a) %sort) 100.000)
        =/  sort-b  (fall (~(get by front.b) %sort) 100.000)
        (lth sort-a sort-b)
      |=  x/item
      =/  title  (~(get by front.x) %title)
      ?~  title
        ;li
          ;a.h4.text-500(href "{(trip file.x)}"): {(trip file.x)}
        ==
      ;li
        ;a.h4.text-500(href "{(trip file.x)}"): {(trip (need title))}
      ==
==
