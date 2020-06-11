if(!window.commonui)
	var commonui = {}

if(window.adminui){
if(!window.adminui)
	var adminui = {}
adminui.fIconGen = function(){
var $ = _$ , ff,bb,tt, nb, sp1, sr,
ly,//线框小
ly1,//线框大圆
ly2,//线框大方
ly3in,//线框双圆内
ly3ou,//线框双圆外
mk,//mask小
mk1,//mask大圆
mk2,//mask大方
mk3,//mask双圆
limit=180,//大图标尺寸
limitSmall=40,//小图标尺寸
cv,//cavans小
cv1,//cavans大圆
cv2,//cavans大方
cv3,//cavans双圆
bgc1,//背景色选择
org1,//传原图
file0,//文件选择小
file1,//文件选择大 old
file3,//文件选择大 new
uploadorgs,
sha,
lyrs= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAJFBMVEUAAABVEgBVEgBVEgBVEgBVEgBVEgBVEgBVEgBVEgBVEgBVEgADLiLPAAAADHRSTlMAyuykkwUVPWRSaP79wYXZAAABQklEQVQ4y7VUXXPDIAyTbCAh/P+/2t7Kh/fQpE3bhGS7jSd81hksywL++vA1DJIbAZj4dnvJyDqI9GqgCGHqGdc5fV6HFkoDq7VmcJYRylAfWbdcvLlsmsscZsAbXWV++2tg0vDeQNDE8IEbt3od35CeKW6zEhP9qmub7LoNvNpkq36T7jOtaXiyLmEfGITLZKLYpTO8ie26FPS9KXvhfTJhbKUHbBpZIYBA+8LRmRvtvwx4uVciD7VIQADKEVDuQPCMuuXsKggAOwLZrHA7WVF4RA8FcIDXclAs1AoBGmofWNF+IAoHYBTLPWBYZHZKuAoAw5A7FEXWx/jcsKvxiV/luYW8cG9deeFvDOC8pQDeJZle+PSTJOc/3CxDjdVpyzPLtQYrZcsfK1yJcoOqEDa4rLluGilQQDSDGSCsteBfzzeQzlxnCZwYGQAAAABJRU5ErkJggg==',//线框小圆
mkrs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaPxwLAAAAEHRSTlMAyHSXUrNxJwL63g0wAzL/RqM6jAAAAPNJREFUOMu9lNsOgyAMhqsVdKK8/3MyzSbYuQsl6LSg2bLeAObLX3sE+IcpdfAx2z5Lh0IAgHMkBhasRtKrp8HieQg2vf5wZ1R3AEqUux+zZP0Vl7MlhfsIUIyN3Spiw6Sgo42iVFyu5DST+RwH8llFHcCqlzwo71Vw3cYKVQ4vr0jxkpJXLFUcLIFmRZfqEre4xhSICyhSoLgIqhOt7CtzwnKAPk31F9NzGqQUSFfSkwEAZDrKmcl3D6YrOIOFiQoWYbi041vcCrOaQnljwYddTyGNnGQ3wmoKAeqO4eqrKyV0j8Vd7EbYr9ZefJGeXs2/tzfGsEac8vHD/gAAAABJRU5ErkJggg==',//mask小圆
lys,
lyqs = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERjFFNkE2NjVERERFNjExOTBCMUZBREQxOUFFOEI0MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMDJBQUQ2NDcxMTIxMUU3OTNCQkQzQTQyODAzNzIyQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMDJBQUQ2MzcxMTIxMUU3OTNCQkQzQTQyODAzNzIyQSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNDMTBBNkZENTQ3MEU3MTFCQTRFQzQ2MjlCQTQ3MDU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGMUU2QTY2NUREREU2MTE5MEIxRkFERDE5QUU4QjQyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+W+q3+AAAAydJREFUeNrMmVtIFGEUx1e7YW0XoovSRcul2h6yIsk0yYqKJQp9Len2IN2pl16i3nsJgi72UE/ZSw8rBClBLhW2BEIUaEm1pV22G920hAKn/6H/0Dh9s7PuuvPNgZ+fzOzs/D3f953vnGOeYRgBP9to+bGtaIwvxV1N/v4rMAMrARWgDCwGxaAIFPD+AHgLXoIn4AGIg1cZeTANGwXWgzoQoSDTPoJn4A74wmtTwSywGtRaPpsArSAK2sBgtgIngiOgAczmtU5wBsRAB3jj8h3yXDmoAZvAftILzoNzoN/p4TzZJA5rcCu4BKZxuuT3JtCd5dIKg3qwm8viHdgDWlRrMN/hS7aAZjAWHADzwMkRECf2GBznOj4EguA62JyuByeBp5z+Ki7yXNoScA98ByHw082Dh8EMcMIDcWKPODsy3fvcPCheeyHXwXzwy6OQV8BN84PvHXTy4DruusseijPj5jWGr2rrDbvAOo5NGg6OKxxrUwncwF3WrUFgnMsr4iRwOigFNzUdvQbfvRAUqgSu5HhbY34Q47hKJbCc432NAjs4lqkELgWfeKzpsgQDdlglsJgniE4zKLJEJbAwk3wtB/YazFQJDNK9uu0b84H/BBo84vxghkpgPxNU3TYZ9KkESuI41wcC54CkSmAPWKBZnJlF9agEdrHYCWkUGOIy61IJfMixUqPAFTYtQwTGfSCwxqZliMBepjtrNArcyHTvg1M+KKXfInYLvLZlPOJaUiWszRy3axBYzzGaSuAtTrUU1eM8FDce7GCy0p5KoFRTjSwBGzwUeJAdjEbrMedUuE8Az+nBKmtMypEtB3fBZx4UA26Fu9SmuxgwJbs+GvjXVhvpWvgYxYkzdlrFOU2xaa3slcihfZrr8ixjZDYZjzwrLbkLzPtO0XNSTbYNt7tlLl5pHu3lGRlgrIxxMcfZHnHqI+czZFWStZaERHqK0nq7qPKcOcVuAq0vqmZRHWFpaE0wE/RyH70UZAlRakvhJAjfYDhrT/GHDVug3WSXV7DQCtMr0nCawvtfwXuK7mSDKM5raVs2PeokA2o05/mX3/8N8UeAAQCcJ9B5GAPkkAAAAABJRU5ErkJggg==',//线框小方
mks,
mkqs = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3dmhyAAAAEnRSTlMAk4f7xKEsIN61gFcOD8zvWf9EOsVeAAAA7ElEQVQ4y8WUzRLCIAyEaSQg/oy+/1NqD2YaCnho0aKWlJM5tdOvu2zCRKm/VVe8WZ289gf1wBG7cVgBrTeu+I0Y3+wuP5x9umDphntSZ/5QNOB+Ho0iF6BxsBIi0kRO30+wximA00Kxu1Yac0svRQu1DoJ9KcKl2ut7zIqmPhST+2gPdRBTmBSdNGc3W7ME8gx6CfQzqCVQtypuqiYQJQhbFUcJGlutOwk0W61pvj1BMKchp2b5Tkwg9jWuxzxvNVTjxOE9wiNVTnhcrBQGvSYaPS13T0jhd3LyXC6p4Hq23znIUeva27xI/1hPtGtMQQd8hTQAAAAASUVORK5CYII=',//mask小方
mk1s='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAIVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt0UjBAAAAC3RSTlMAGKdn9UjlL3u+/z1CoNYAAARWSURBVHja7Z3JsqM6DIYlD5D7/g/bwZN60XfRVQc84UHQ/pdUQr4IWZJFIgCWlpaWlpaWlpbeJ+xwyi0EAA0AFkAIQ6yhUUmze/XjuJPH5h3xg94dKRV9hXOoDj7QKEhsWa80AQMxgEaxlZ2DzG3um9Ba1ZyAnJ0GjXtQlW914rhhblm/9EgqUftmgQSbr313ral2K+WtS7wBCH2MdA/ET5PY9SUa5h4f2NsEXEWbG2NpKRW0k/O+PzR+Wpcr9KXO7iGFaswMSEg9Ld1qAd5ckEXQGhX0kSPbCfojoJ/CtyA1Fby0J3PR2XFe1KiPIrnRYxeyMzMgKt/UPbRX0F3K7y3dQ9MGI2TQNnOPUcwgvQyNoIcx51Jn+PQ+jhlgo72FpXc/kBlAOu1vQ6PQMFQyhNvR4z+E0aJfN31ajGcGFPcs3bVGqq6e4j6t1RRmQAjV7oEIkxT/5Di0mgUd77bF3EN+YJpUrEspODpH6tORVYTOjNYisoudygwoK6AnM8eWGzJLK1kp5goN3XRmcFgKvc2HvryZc3F8l8BB/iixtGXBfIWBnA19ZWrB2dBXIKKqCh+m8z0IMo3R0Vh9iheAD3RurtSaD7Q4wz6ztAJGUnnugcgJ+oxGlHcVhjtIzqGNF/SWA83LO055BHfvyEMkbtCUAa24Qat0ctnZQQvhU5Z2wE4u6R7ED5qS0IoftEpBI0doTEAzZP4JJTJK1emSCWjDEdokoHeO0HsC2nOE9i9ciAgshVHojSf0FoUOPKHD+6CfoTdAa56UernHgq6Ftjwp7XIPFtDiiZSPhDY8oU0UmnhCU9wfHEdm98YWwsER+khAs9xvbW9sITxyIRLHpjqlao9H3glg2K7BJPQT7gT8SCaeuOUXY9P1NLt+TcjYBCB7l36LpYlZeUo598a5bQRM1sY2cPeOM2he/nFGI3LSJqscfrFTCXx+tgmng2IE5B5k0TyI7An5pHJjs78JsQkg5/8rOvcENjcEdGZi//NdPiyYvwEK1pzmbOjLmo6FqS8Mfd1RYhBATCiJgwBADLZd6qqeuLSnm54W3QGFlmbQa/JQAT252KNr6Mhym5vMjYUKS0+uq2OfLqMXaF4I+QaosvTMbmR8oKiovUTznCNV79tJNWqI36NP9ZOm1CDfULGdSVbhnX0jdX2TodgPT+cu2S1KEhEO7jiZ9Mi/jB6pHjnSKGvoVUamDtJLVsxZt5UHUucNF8uiGUbdciDaKOpM5txfHQQd+kc+JzIDVW4dd6DsPk7R5iayApLOGf2bX+cUXPTQtXoqOfvrh7E+c+wtAMgOI1YMFbYrSq+3R2o+yrm4WfHIodmyxjLStsqPBk1FTJo8CL5ufn2lyUiY+z7yRVfXMKy9zp6ECXecxNha5Ds/0/RE0tdWUQ4s1bdl/7kHdvw5wfMejfI/9+CH0DQJuERBWJeoGJ3xaNt0B//pByv9fcruj7BaWlpaWlpaWlp6o34DwExZD7xirx4AAAAASUVORK5CYII=',
ly1s = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAJFBMVEUAAADvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXMg0/s3AAAADHRSTlMAD92WUnL0OSjEsv85Hv2WAAAHDUlEQVR42u2d3YKqOgxGV/ojuN//WQ9iaXMu0H1mBiigAnWOuXTUWYYvaRpoCx/72Mc+9rGPfexj+5ls+cX6FtByipIqbZ2/vRC6Slqj9qpFQosVfzlP/rmpg0YtCVqs6nnB+xqRl4A/Dy3ORT98OQBjL9uu04OhxTnzXQWtUSvtnUsqjZKq77pJz3I/BV111n+99tPxJqf4VUEhuvYYaOfNOrF+k34K3cP/2T76Yz317Qc3StC05ENJ1XZXfxNWdLqvp308333sLys/W4e7vxsb9oN26fZf9frYNXan+1Uy3T7QlTG3aFrt5K/uvsVwSu320GLqG3J6Mm+ZG/Zl9ReZtRdWeuaLeXZs02j6C1WL29TTdzcnvfAKq8U84uxV0FU4Px492ZhufLsRtD89qMElF++6IvstH1zkj+sTc+Clpqb1gPXd6wOxFgG4aMuLre0DRG4h/kJ5VOqBkDq2MGc8EKR9qaed+hdH4DfrTAN4da/UtK8soGEjZuhwAtaRXgbdp43Ldcu2QEgOsIuo7WLma8emptil1HYhc+g2Zu6r7WXUdiFz2pwZkiykns0e7gQE2YEZOgnAyT3r6UoshBTYxaKoBXXxKU/X6oHUsZN1CfBaP+NpSdUOeeObrrFg22eG8T8CXCJ7mq0B/edheXgBdF9movYdigc9XTmgUd0XGpEz0LUPeVoCEE57M6OnAAR5KBDtGeiu7G6dOPCZifM0tKv3D8J7CkkO3HSrzUxnO6BJHGKpAZKshjZnwOsx0OqBs1mbPSp3mDj+y9ZTGcRkrsBR4vgrELNOHs4ARo+DVgMYtwo67VomTZZOaQ20P7Pd/dbF0y84++V5WtTDJRwL3SUH1+WedmcInoPNBzi7xdARiJejoS/xhrJIHq6GECnALH5sMB/ztL9XtQebRkZvVY9BV2bivfurGjDVIugO0EsJ0Be94cxCi2Uq1exuV8DKgkD0J2hiGdApeuwwFIeedmz4ZNPq+eINaAZaignDv6Eos/LwFppQCnQXPQz0YcZ+m6UYs2P6+AktXXnQUWbk4U4lqaPXh00p72ktKXfc84fy+6DlPFUOHmUROEsW2gKNlgStaRh5pnB19PWHZqEr1j9ss4Ooqyz0pTxod8OahJZzOWXpVz/+iMTv0Kfi4hBobmBT0BGoC2OmHmRhMxB9Wxp0O8ho36FTeXHYA6UMdMXhLbyR4WWQ88zg77Y0aDvwpJmRTyGjS5uBdqUGostA+1I17WdaCG9g5qd6QnmM4Wekvb+nP9B7QQ/jtAgb5LRfII9Q6ogYMtDdcD52vFX8vB3wC6o8obBWzX06Jb+tyhtOEgqwNIqZk08hgZibBNhhY6SMxofNQF+HjZHjbdhA+jEjjB6krPxRm0EDycw1Rg63jkEDyQzr7cJGFx3OTEb604VBn5jrT8fiIlHMULE/Pd1QWLtm7IaKGRkztTRJC78A2g7eY/G2K4a5PsFgcd7g5qctK1NHwM7dsaUrD7pjRh6opyB91CdGWqIDT2uioN5YAIYrvs3oWK8l5Y6OWXn0+UPLmL+4eiR3jHlaIz/v2x1ad4w8QDrSYXKAFHE3sR5/wm0Mui0mFAMwtmeJmXivLaDUEzvhvbGKLkWPLeBZZFtNPEBqpspBe7iqaztVJo++qJ3nxbvFPZKjq6n1QeMFv7PgDh7L6xNTy07Hm+ohtwhpJzNMPtZopj+xetOe1w6GkqcbazYkcgsCd0h3uYVYUxpI5BYE7iCOM9MN3ElnZhcEbm755ZCTzkwN+SXFm4ojkFsOOQmt5kCBmDO55ZDTjZm5JcUbl9G5tbK5blLnQf3+Q0yNzT8emIM+mfkNIDbJdhW35/zXZg+47fyS3wBiA/sjzGw1lo20oPeqds+CVADNTkLyOa3fAOK65zTG98+7ZkvMGTdW0TK2emq7xFEBwXWztVTGLhKYXr+9AbMBgszcFpwTbBQHdna/nleN3uKBbk6Os1HW73wTZQ+FOPEs2ddnPjX01LoDdb9r3oKwX5DPemq3+Z3+fn+7JalqSRJO/fQ8bTvTtRVL0+uy2rPffE43XC4g/Y3AZUPCsuGu3xVOumqr6qlOnuX72y0co5OLFvxWScRRAWHp7qNLC4voWw/WbQEttrZAs3jL8sVTk0tfDtTy8idvqr6vrMsX2P/ybW8h9RvUus6mF6q532BY1iy+esutnFdW+KrBA2LSC7Jfrf3W6k1aWY6tnZYkogN4vuwTe4vpy+pyff1cSg0CWAdPeLtWV1mAFNfPi95yy/2HZq1J6c9VEBfNanfXKrfDHBqND+WhR5t14u5nMtBYuzyX1PHL5x49bOQtD+z4vx2N0qvk7Q6huXO/2XE/I2LNWDkHK/0HXmWPsGqlrCOsvsbbWx0WNvbFxa0++djHPvaxj33sYx97wP4FuhSj5B2WYY0AAAAASUVORK5CYII=',
mk2s='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAJFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmWAJHAAAADHRSTlMAUoD0aTfC4g0dpP9f9ZIGAAAEhElEQVR42u2d25bbIAxFBQgH9/+/dYyDgD6000sGc3FsI8/iPHal7Z7TgyTAdQCGhoaGhoaGhoa+n8Sxf5wRBAQKIAAAgAQPCBgtR2jjSQVDgszGBygCWilwYQFtfAwosPbjVqGNZukIPVuB3uz4jaSsUvZ66NnOHt9xyypS7kpo7VEfkU37WB72Euh51XhgJYg7uFuhhdZwsOzDuROhDzb5n5Xp0Z4DPYvVwFkiN9njoY0UcKpsrMauJZHCwNkiT0dCa4lwhVysWpKy6kPTNcyggzzI6dlruE5OlScTVf7p4UpmUF6Gt+MhAsKlwiDejYf40WFn8hHfikcXZtD0Tjy0hC6Sen885qvz/LfPyGWv074XM6DfGw/U0E3ZYKpcU0HoSA1hj9PeQE+JPfEQuiszZPYb29ATdJYyzdCIvaHx2QptFHSXmFurx9QfGm1sc5qB0QBbW7wNaIEcoM2zCVoDC+kWaM0EGkUDtAcmmluc5gKdrnqS7zL8tTmvhp7ZMKf5Ur9oVj7Qeq6EXg0f6GQ+JO90pAEl54K3tRVJVG89cYJOndwknI6smFO2SpZD6X+tvGoEDcgKWikq/xzMIg2wVsSDWaRToZbcI50Kw1do4gbty94bxQ0awlJy2rNjBluMR+QHLYrQgR+0KUIjP2hfhBb8oPGOTn8Z8CXXfXiufEjurSU11cny1MeguxSgA0doU4A2HKHpjpkWBWhxR6fhjplGltRzFtrwtJqy0OIOaXmFpjs6DcPps4aP7+D0gD5tzJM3mExHPAb0G9B+OH0W5ch0J2iee4DXpTbicZrwjvHIOx1v4fTLhESBpdcfNzxCKB31xhuk4x5OxzuWvJLT9o6ZZul8CZLluZi/40J8PRZ93X6z7C4fpQwzPESg4pTH0GhVhGZY8275vEcsQjO8wPiC9LUuK27Ytvy8B7/yoSr2iOwuA6gCOrJfhwnoBzfoR0VgSPBKtat5QJZbqAlqoCP3SKegH6w6uX3UFEEgzSnUca1ymtdzTAHqoFk9m6ereiSvoufWSqc55SNALTTyTkca2rIp1XGphoaFC3QaJA0dmbRyig3Q4HhAb2BsQE8sWrmdmqB5LMWtN89unZJymJrs1n5kC3phYHVcGqFh6l5AaKrfn/8ZQHr3RfdshobQeWzKvOxUNu1zOm+zPpW7rpA9/9f7khk1cxdDoWNfdLnxOHubpbpVEMqup/xtlg59jlCtzP4j5+ua63RDF/KP2pXKWuxRrdfCfq/8Ok55dUJsKBXb4rVylBevRpLFBlG+C3fy0spX89dVrbQLu8xSc3xRNV9ECNfMIc5XPaFbW9NQnV9Gql+aXft8B4nl5L2MXUTtkm/oHuapz3P7nBfBAwAYkuecqLrQ9Mr9pgVGwYNcj7bbKudCUzNoHy7MOh85kez5Gon2UkbglMVD/LZqkcuO27TdpmmPb70X9/KvRvkMio/TrpcQk3qKHl9C8x95/XEDRXyP9xjoT/TsNytZjGilR3VMgzp8azIDAf1e4R4AEJDPGf3Q0NDQ0NDQ0BBj/QRvAC8wZkVCbQAAAABJRU5ErkJggg==',
ly2s = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAJ1BMVEUAAADvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXPvuXNoQjPVAAAADXRSTlMA8kJ5XCjglxOuz8D/ik8nCAAABsZJREFUeNrtndl2ozoQRbcmLDf//6m0MZrug53EbSZ5QspdnLekHffmUCoNiBLs2rVr165du3btWpR42zfZEGTSSJk8DmjpwKAFMXpEbPqaoO0gtAyuXf3gYLwXwpWGNknpv+2DfxTTkF6z/XloKZp+krfDaEAkwDNzB2IIut8W2npzB9wdU/QiotQIxRKCTFpK19yDu7gVtIkHeYv7x4eoXF5bTakJt+iddU8Y/ii0dVb8w/tEw5Lilryz5/hRaHn4iYrUp/hCyvEqfYMPQbpPQetGvnRXx3H2c9fCI3bnQ2vZPH0/c6ItneK7ob+R46Df17Vd/FbNg9h50Ka5fs5Fx/ulD9evD6l/G7Q6XuKi+QjypYWry38hw3ugjbm0Pyd6PiejL9gp9G+A1qEFSIPjs5JWAnQivgx9CY1O+Q3GySq2AKe1EFEr/344ACQ5bDG4T0YKwIjwktNHlXXp79PBAITTC04fNNDF7ZgJ8dyAXPZaLl6RATrh2VBedIBRz0LLI9DpyKaKugOO+jloqwGEY2M50QHBLGThheDQQB/ZXFEDbXJPOK0F4DwF5E+AUI9D2wDEc5nVmJCAaB5OecoCQ6SQzg3NbNqSs6Mk4ORKMTsJKPkgtAaGQDGFCNjHoKUCIgXVA1I/BH0Aki8JHQPQPAJtFHCiqPy81XL2tymWhXbhesczoa0pb/TFamGyoR0QY2loF+b45FyPM1BcZ2CwmdCygU6Xh44DtD4T2gBNXx6acIXJgR5Kdyy37imbBS1biK4G6D5cs8I6tLm2gQrkpgcgE9Bpbb67nXQHwmZAm6aW6IDeXjuZNehYT3Rc4kNlQNtrhNQRH5Mwo8uwCrpqoL0WqNHQTU4laUs1ClNWj6BFHeOO26A2q9C2noTHde4SVmPaN3ShHmivBUr6ZadNC3+grqAeVsIjXSfCVUGLFWhVU5b+SgzNCrSen7gXSh/duCWqiXboa4Lmz7gl3jlta2uHky1RjvvDuoy+LNosQsupXF5WaZwa5DjEY13QapwaJpxWdUG7caKW46zo6oJmGC3R3UGfqhrifU+0W7sAbdvp1ZHi6SMsQIf62uEvhRYjzPFPngqVFqAT79wG/ibFzHWP6noXvQCt6+tbLkBrMV2d+gzM6pymW26IsrYZ4rRk/YiY+zw8SnldfdD6fhAnJy7rl4WH51foN8S0gPbXQa87rX8jtN9j+l3j0u7/FtP6lzZEVx+jv+/y5HJGrEJu2emlHXylhx+/rCG29xPXsdOhNmY7mriOna4OOqxAV9kdBpYnAaLGKJcZv0k1ui1WnK6uV0wrMa1qDI/xCtK/iD0VruWNoe+XZhR/q4tndf88Vo7m4m1t/XgDx8Xs4evrXQxrzxF9fTlv/TGzqA9akPMcsakvecRFaFdfTK8/ZmaozukTDP0ytKKyNUjTjjuTCafrelSUyNstpmsL6bQC3dSW8yba4XjjFWq847DkBFHBcF6bBIi6Zl3DhLFj6EBVT+UMq4s1V6dVXSEtWIlpIgqRYk0hve40oqZM7SenUtOLNbamkA4Z0LqDv5VQ236yr5uYxrYC+jqynraQugyn6Zl7t7VIdExsMJh54UzYWnLH1JhzyumZF+q2lwNSntMzL0wV6lmmXiObgtYdNBWsjs2+6zvlqD8oqGCkZyWIXKeJXCsDlU0ds5u5p192r2L+IoHpwjXTDS4YkIVHTaYBzvlOX2oKFLZaA9GTD32ZMBSNarlQ22AG2sfS6x923ujZhxX918WW6leW9jXOQcfAUiWkj7fCyLXYTn72AMS5oVGlhiDHBrrZCdRsb+0kIAoNUQ8CmC+FOz/ECBEulaS3z3bmK0AfhcZ1QCgwcJIB6BxPQSugTZs3RpNaYKk5LT7qVEey6oy+1+fUslIrc/HuhwC0adO41qnlWhnoOae/SoS67apQZJUIFVlf8vmat18jO5Fj0lpyOJ8AhN+kR1deAJzWbmx2geH48RKWXwWG18sCi+x7RvCfjJHvUs4ZkZhXNPtSrfixau2Pufzuotk3NpDOn5ikf6Q8OSCP108+WtM/YxT6oULwN+0ESOe3FbC3/vDBkvu3gQek/g1+b3C4AYCRw/dW5UGEF4oPm2R+zr94tCy+eLyd3xyKMqgnzpOxw7YHdlzj8N/DXAYVQ94JRHaQShY4GuXLb3Nfk7Y7Cu8FUam7SbQlBEnSOp3a+8nzdofQfBuu5orpdt9LJm5uu36B435+HBdanR57jaA7Bv/iMuE7NmmaILR2q2dYdcZ4n1TxI6z+jZcQZEJLZPrex6ARkegRceLEpV27du3atWvXrl2f0n8MykNNqm6CuQAAAABJRU5ErkJggg==',

ly3inner = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAFVBMVEUAAADLrY/LrY/LrY/LrY/LrY/LrY9PahUZAAAAB3RSTlMA/prQGDteZUp1GgAABDBJREFUeNrtXMmW4yAMLAnh///eaYzmkKQnMYvBYXtvrFvH6bhcVQhkFuCOO+644447ugV9+f9C5ECABwAwoBBVNw2UsCOfuMYq3g0HZfckoH/AzM9AUO+IWCEKBRwEIJDD+8VLuOiCars/0+hNWTb1OtaCEq/PfzwzjbB7fZVdT1B2f9yHClWp/f4FUE+W6gTZHmJXsUXVkPinulnoJRFLnpiIiNheaq1MRERbY6YeNNWz9AvL++ZkbUREZvvqJ0w5WUVMsTZ4zAfZp/1AIShR/41yBw2ZWkhoiYhYWrhAmIjINrLT1tSc27fysbaR7kPCM2NRASZq2ZBFz1HRYExFqOgMU1EbrovTn6XxmM5/mDMtpRcmeAL0Uou2RGR6FVEmm6+STIkDmHqBIgacVIPq0O7ewhEDWu3FNv1B3h1c3x1s6BrVt5D6x7iQGIhIKjzlAe4Pil+vIIpAbQqw6w3KcU22GiJeTkCeJR4A+ISAHOvGAeNGgIIBVEpJNRgUJmqU8COr2W66sasAtTECI191o0B5BlRPmRpK1MNVtoSpcUQlqOJI0xtIVLwBcvh3w4KqIH44CuIj9oT3u1K1n49yZCwohCO3kBbaB4MKrc5BxTVYPcCcVJ+WiDA8zFG/gBfS4aDoqB8fL8t4piSrn0xoe8/2J0mmeGwX83HfpKcUFyrEDqbi+ZYKkwIfBud+BijN3FemZKmI0/lTPZ4Dij/1O4DSOaA0DcphVsjnzTm4ukAsL9+80OxwWJeTz88E4peTzwV94QJGP9x6DabydZ+sCGpeRk+B4lXY4bTv/3f5KA1KpzF1SEaczWILyDcvH7jPmy8vn07rk32mg5tUtQdlFOfK54Hqpct2ir1pnzD45EMXRJOYkmzZLnN87pOg3BxT2eMbKIM1TJV5vWimDIjPXkmbzkskouoFk54GS+iXfbk/Qz89nVAw3ZeTHGMLp6yPGeB8Tql1RObNOJLHhlrdRl60HkHGZ5o7p4T9rHCIzjR3HLXEbB58MJ6qcIIx7OqGUmWj+SD8xDPGJSvS2ExsfKWJH5SrNh9FEMmlngGYMSVElKjo8IkBPwQT+4rx20ZDBgs2tX4x2hXuYwQkRXx5K6eK+f4CVon3EnC1xaeTl+mmPvfct9wS/9CvChQI8B3zuvpLha/tuQT1sju2fqg4b/IlN14suUUlq48nQM1wTGtuezpxsifAtxyI2gJMZW1w9Fa6snzVaNMhCjcdntvYCylA4hs8ngJcsEKrYiOrb9Dqyn6lKGV7C0C/2/JrjT6LdLRhas3N0fjdRn7J8NJnG/kvWbWnDODKhvtLRxP8qWG469EEbw+90iEO77cpOPLj9/iQasW/OxjEJI6VEdpHHgzyyQEAVoHqc/JZQAQ34QiVEFcygw89bOal42rH8vxzT4cDjO6444477rijY/wFy5tat1RSijIAAAAASUVORK5CYII=',

ly3mask = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMAxT59/xqeOCkAAALVSURBVHja7ZxRc+MgDIRX4v//ZKF7uN7MjcG2BDZSGvSWTlu+7C4yJibArl27du3a9V1Fk3/PIFQABQAgABiKGgbFoPoDcywBz5CNQjHVcvMrwloXQhmIprgGoIqR6B+XvA5lFmlGLnobaQSL3kfyY9FbWZrJlhmKdQYJAITqw1BltvUDgBrFYmOanmACET8HVaat8/0jWmWdx0JeZZ3HQnp/1vlnIS1nMlDReqZ7KgpguqWiCKY7KgphuqGiGKZrqqtx32QCDyn1aB/39fYSxgQidV5muOL1quxW6n2o0zdOUeZdxYpPVgaLdjLYAaWr9lfUbt8i804N5KCZdzkDe5OMeR0U9xzkWKH6UpVYofpScbBQXalKsFBdqVqCxUL1BqTAHnXaqzhcqM6QFJyov1T1WikKYGqViXevHZQSuNf4xwnca6VJ4F4zLGVw7+hfFMXNlSdBpBrDMkTqOHBK+yhFzg9Jzx90yuJYeqVqHMenNc8NZYQqcRxl27ehvhtK4jhk2/c7oXhzGAk1jkM/624GFLVOEP2wlsAZMTRFzj8h6FFJl0ulOEOkji81Q6Sa7YMQ/w7uNX5xAvea15rAvXb3J8C/o3utXRzvXmefbLlUYvhklMOF6vxEJVqo3jbn4g9sOyIwgqXqCNXdEF4qVU8CRqxUPaFyPqrUH35Zr+oKddKVlilFjr2Euui6fHLC50yTJQaKwqEUQAtmoJDL1DUz8LT1nLqkFPdA88XIL8dK1LFuWBQrIW+j+AFOeJwg58GLnEdUch7myXnsKecBseepDEdH7wdUPNrb1bACsaigVPkxmSwd2SbCUxYaT/3aBnvIQjUuHq0KKKYtFPNjK2ZbFHPJErKvsR1ZUR5XS8jzdI8nwDqKJeS7FfHNqiEsL5L/8Rb1ZkuoqveGbaD/KGCVS0h14BZyqCmqiUtIh5B+2ZfN/Ef2/Nfy7Nq1a9euXd9WfwDZVf+zF1hpzgAAAABJRU5ErkJggg==',

ly3outer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAADFBMVEUAAADOsJHOsJHOsJEcgANSAAAABHRSTlMA/lu17o373AAABBtJREFUeNrtnd2WgyAMhMnw/o9c2Atttz8BAqIMHnK3nlY+ZwdMRYJzK1asWLFixYoVK7IhJ5wTH38Fcmg4URnhYld26cdbwkI38i7QECsNYqCAthN345bOxHAuvnc+OCc/nfEo9yFoH8ye/fY8HkOgP0S2adfwla7Q7+3XNN/6vQ7Qb03Xt3zoy+3Q/16WNq0QD3lbDrR4ZBD4l7vhumUI8kFsaXRGj1vbC7vWI9Ims/TJIhrPJy1tHLoz6P+5Kmpf89m439w6ppkRuxI+nqH0U2bpndXXn1iGMzecWupO3NHNirOt1L7KzifIvDvb1RhbzlCi3SK2/6RUMEd3ZoidGmZmnMu8WyT4PkrvzA93dpgbEh5me1Ni6yGXMD+pi/1dmJit1ELFbKQWyzVFd11YWoThfnkl896Yb4dGOPw8p1HqgFZ7bIY+8d7d2mzxBoSrmV0spk1S6sjRXR9SGLLAZWibrQv2uNzQH+l1tdIYY+gtNpXRqHQcA11wJXIXM0rop9S+7pK2sXKUzi+wRJdC7ituOHSN0ojX5nbJ24QuNdKXEocyb82LXWkGoXNSg1XonNSeJ1FSE6do9bSnEHpH8EZPCwl0EgSJQ+JYoGGC3hJDBuhUcgz9o3AUAV0+6EciB3TMIJK6I+kPMLsj5Q8wuyPlDzC7I+UPULsj4Q9QuyPhDyJR0/4oKc1l6USCBG5L66YG0cOOtKnz0KQWN1AG9p4IyxMFtp5oS7GJrKEcCpxKh+J1RC7gSO+FFsdgYV7ZNwN1J7yT0gt6QS/oBb2gp8pWF+EZ1xFYMcMtPU3247Y85zLtc4/p8unIqXQs+wHkne42zz24hg8xqA9H+ACyNH0RJ+iHeqcDdz9Upy+YTK3OAamzoYHb0r8HIpU/9GlNdcaWxx/6DKH+MkWgdodyhMkfiUlv/X0PFn8k5o8TPxsDszuScy4gdof2gmHk+r1lnCgCidSoSfgfJF1RXjDWhCQMlxqhKqGLFFKn39PV0TLv418ndPp1eThWqTMvRCfIxkudW5fgXc21MAzS6eE4vwzpgsguw5KspYYZJL8MC3noob1Qap6FjJe6sN4NhSEH45glb3i94/qxD24yq4OkZKwBS7iKy6hR/LGDMRIX1Sx4K4wwdCgN4ny2zi93u2GpjP0UF97OvV3KksPmKv/CWWinOKAFe02nTszlNac3LR51GbW9mSkLot239Nz51HWFD42jQmXpwGo71xU+vHXhyjlLhP4bu08F+hfyzlozok5Z9vb+BYbdlKWc3ZxFs92U5cnfPTJRIXg3Z8l9N+XmBt/NT7KNxJe3d6PSb9jxq90GF93X1ii/ewAN3RpF5y6OHKM3oanlZtnuR/esPjgzbaz0Rj7VFlafjO9BuzhixYoVK1asWLHixvEHtUCLYxfmeGUAAAAASUVORK5CYII='

var downSize = commonui.imageCanvasResize,
mask = function(mk,im){//剪裁出图片和mask重叠的部分

	if(!im.getContext)
		im = createCvFromImg(im)
	if(!mk.getContext)
		mk = createCvFromImg(mk)
	var mkd = mk.getContext('2d').getImageData(0, 0, mk.width, mk.height).data,
	imd = im.getContext('2d').getImageData(0, 0, im.width, im.height);

	for (var i = 3, len = mkd.length; i < len; i = i + 4) {
		if (mkd[i]){
			//imd[i] = mkd[i]
			}
		else
			imd.data[i-3] = imd.data[i-2] = imd.data[i-1] = imd.data[i] = 0
		}

	var xcn=document.createElement('canvas')
	xcn.width=im.width
	xcn.height=im.height
	xcn.getContext('2d').putImageData(imd,0,0)
	return xcn
    },//
add = function(mk,im){//图片加上mask

    if(!im.getContext)
        im = createCvFromImg(im)
    if(!mk.getContext)
        mk = createCvFromImg(mk)
    var mkd = mk.getContext('2d').getImageData(0, 0, mk.width, mk.height).data,
    imd = im.getContext('2d').getImageData(0, 0, im.width, im.height);

    for (var i = 3, len = mkd.length; i < len; i = i + 4) {
        if (mkd[i] > imd.data[i]){
            if(imd.data[i]==0){
                imd.data[i-3] = mkd[i-3]
                imd.data[i-2] = mkd[i-2]
                imd.data[i-1] = mkd[i-1]
                }
            if(mkd[i]>imd.data[i])
                imd.data[i] = mkd[i]
            }
        }

    var xcn=document.createElement('canvas')
    xcn.width=im.width
    xcn.height=im.height
    xcn.getContext('2d').putImageData(imd,0,0)
    return xcn
    },//
subs = function(mk,im){//图片减去mask
	if(!im.getContext)
		im = createCvFromImg(im)
	if(!mk.getContext)
		mk = createCvFromImg(mk)
	var mkd = mk.getContext('2d').getImageData(0, 0, mk.width, mk.height).data,
	imd = im.getContext('2d').getImageData(0, 0, im.width, im.height);

	for (var i = 3, len = mkd.length; i < len; i = i + 4) {
		if (mkd[i] && imd.data[i]){
			imd.data[i] -= mkd[i]
			if(imd.data[i]<0)
				imd.data[i]=0
			}
		}

	var xcn=document.createElement('canvas')
	xcn.width=im.width
	xcn.height=im.height
	xcn.getContext('2d').putImageData(imd,0,0)
	return xcn
	},//
getsib = function(i,w4,h){
var x = [0,0,0,0,0,0,0,0]
if(i<w4)
	x[0] = x[1] = x[2] = false
if(i%w4<4)
	x[0] = x[6] = x[7] = false
if(i%w4>w4-4)
	x[2] = x[3] = x[4] = false
if(i>w4*(h-1))
	x[4] = x[5] = x[6] = false
if(x[0]!==false)x[0] = i-4-w4//left top
if(x[1]!==false)x[1] = i-w4//top
if(x[2]!==false)x[2] = i+4-w4//right top
if(x[3]!==false)x[3] = i+4//right
if(x[4]!==false)x[4] = i+4+w4//right bottom
if(x[5]!==false)x[5] = i+w4//bottom
if(x[6]!==false)x[6] = i-4+w4//left bottom
if(x[7]!==false)x[7] = i-4//left
return x
},//
findc = function(im){
var w = im.width*4, h=im.height, imd = im.getContext('2d').getImageData(0, 0, im.width, im.height)
for (var i = 0, len = imd.data.length; i < len; i = i + 4) {
	if (imd.data[i+3]>127){
		var si = getsib(i,w,h),an=0,man=0
		for(var j=0;j<si.length;j++){
			if(imd.data[si[j]+3]>127){
				an+=45
				if(an>man)
					man = an
				}
			else
				an=an
			}

		if(man<=90){
			imd.data[i] = 255
			imd.data[i+1] = 0
			imd.data[i+2] = 0
			imd.data[i+3] = 255
			}
		}
	}
im.getContext('2d').putImageData(imd, 0, 0)
},//
merge = function(x,//图
    m,//裁剪mask
    l,//overlay
    lm,//附加mask   图=(裁剪mask|附加mask)&图 overlay=overlay-附加mask
    t, //透明度
    sha //阴影
    ){
	if(!x.getContext)
		x = createCvFromImg(x)
	if(m){
		if(lm)
			var m = add(lm,m)
		x = mask(m,x)
        }
    if(sha){
        var xx= document.createElement( 'canvas' )
        xx.width=x.width
        xx.height=x.height
        var y = xx.getContext('2d')
        y.shadowColor = 'rgba(0, 0, 0, 0.2)'
        y.shadowBlur = (x.width/18)|0//阴影尺寸
        y.drawImage(x,0,0)
        y.shadowColor=''
        y.shadowBlur=0
        x = xx
        }
	if(l){
		var y= lm ? subs(lm,l) : l
		//findc(y)
		x.getContext('2d').drawImage(y,0,0)
		}
	if(t){
		var xc = x.getContext('2d').getImageData(0, 0, x.width, x.height);
		for (var i = 3, len = xc.data.length; i < len; i = i + 4)
			xc.data[i]*=t
		x.getContext('2d').putImageData(xc, 0, 0)
		}
	return x
	},//fe
makeGrid = function(){
	var c = createCvFromImg(ly),c1 = createCvFromImg(ly1),c2 = createCvFromImg(ly2),
	chalp = function(c){
		d = c.getContext('2d').getImageData(0, 0, c.width, c.height)
		for (var i = 3, len = d.data.length; i < len; i = i + 4)
			d.data[i]*=0.66
		return d
		}
	if(c.width<c1.width)
		var c = downSize(c,c1.width)
	var x= document.createElement( 'canvas' )
	x.width=c1.width
	x.height=c1.height
	
	c1.getContext('2d').putImageData(chalp(c1),0,0)
	c2.getContext('2d').putImageData(chalp(c2),0,0)
	//c.getContext('2d').putImageData(chalp(c),0,0)
	
	x.getContext('2d').drawImage(c1,0,0)
	x.getContext('2d').drawImage(c2,0,0)
	//x.getContext('2d').drawImage(c,0,0)
	//console.log(x.toDataURL())
	return x
	},
rot =function(d,w,h,a){//方向,宽,高,x0,y0,x1,y1....
	var b=[]
	switch(d){
		case 'lt':
		case 'tl':
			for(var i=0;i<a.length;i+=2){
				b[i] = a[i]
				b[i+1] = a[i+1]
				}
			break
		case 'rt':
		case 'tr':
			for(var i=0;i<a.length;i+=2){
				b[i] = w-a[i]
				b[i+1] = a[i+1]
				}
			break
		case 'lb':
		case 'bl':
			for(var i=0;i<a.length;i+=2){
				b[i] = a[i]
				b[i+1] = h-a[i+1]
				}
			break
		case 'br':
		case 'rb':
			for(var i=0;i<a.length;i+=2){
				b[i] = w-a[i]
				b[i+1] = h-a[i+1]
				}
			break
		}
	return b
	},
createCvFromImg=function(g){
	if(g.getContext)
		return g
	var x= document.createElement( 'canvas' )
	x.width=g.width
	x.height=g.height
	x.getContext('2d').drawImage(g,0,0)
	return x
	},
makeSubMask=function(cv1,cv2,cvm){//cv1线框 cv2图标 cvm生成的mask
	var w = cv1.width,h=cv1.height, d1 = cv1.getContext('2d').getImageData(0, 0, w, h),
	d2 = cv2.getContext('2d').getImageData(0, 0, w, h),
	ctm = cvm.getContext('2d'),
	xy2alpid=function(x,y){
		return (y*w*4)+x*4+3
		},
	bullet=function(x,y){
		return [
			[x-1,y-1,255],
			[x,y-1,255],
			[x+1,y-1,255],
			[x-1,y,255],
			[x,y,255],
			[x+1,y,255],
			[x-1,y+1,255],
			[x,y+1,255],
			[x+1,y+1,255],
			[x-2,y,127],
			[x+2,y,127],
			[x,y-2,127],
			[x,y+2,127]
			]
		},
	ifoverlay=function(x,y){
		console.log(x,y)
		var b = bullet(x,y)
		console.log(b)
		for(var i=0;i<b.length;i++){
			var id = xy2alpid(b[i][0],b[i][1])
			if(d2.data[id]+b[i][2]>265)
				return 1
			}
		}
	mg = []
	for(var i=0;i<w;i++){
		for(var j=0;j<h;j++){
			if(d1.data[xy2alpid(i,j)]>204){
				if(!ifoverlay(i,j))
					mg.push(i,j)
				}
			}
		}

	for(var i=0;i<mg.length;i+=2){
		ctm.beginPath();
		ctm.arc(mg[i], mg[i+1], 3, 0, Math.PI * 2);
		ctm.closePath();
		ctm.fillStyle = 'pink';
		ctm.fill();
		}
	},//makeSubMask


output = function(ox,oaddmk,arg){


		for(var i = 0;i<arg.length;i++){

			var x = ox,
			addmk = oaddmk,//附加剪裁mask
			xmk = arg[i][1],//mask
			xly = arg[i][2],//外圈
			xlimit = xly ? xly.width : 0,//主图片目标尺寸
            xsp = arg[i][3],//锐化
            igb = arg[i][4]&2,//不加圈
			xsh = arg[i][4]&1,//加阴影
			cv = arg[i][5],//最终目标cv
			xly2 = arg[i][6]//更大的外圈
			bgc = arg[i][7]//背景色

			if(x.width>xlimit){
				x = downSize(x,xlimit,null,1)
				if(addmk)
					addmk = downSize(addmk,xlimit,null,1)
				}

			xsp = parseFloat(xsp)
			if(xsp){
				if(xsp<0 || xsp>1)
					xsp=0.3
				commonui.imageSharpen(x.getContext('2d'),x.width,x.height,xsp)
				}
				
			var y=merge(x, xmk, igb ? null: xly, addmk?addmk:null, 0, xsh)//0.9)

			if(bgc){
				var xx= document.createElement( 'canvas' )
				xx.width=x.width
				xx.height=x.height
				var xxc = xx.getContext('2d')
				xxc.drawImage(xmk,0,0)
				var xxcd = xxc.getImageData(0, 0, xx.width, xx.height);
				for (var i = 0, len = xxcd.data.length; i < len; i = i + 4){
					if(xxcd.data[i+3]){
						xxcd.data[i]=bgc[0]
						xxcd.data[i+1]=bgc[1]
						xxcd.data[i+2]=bgc[2]
						}
					}
				xxc.putImageData(xxcd, 0, 0)
				xxc.drawImage(y,0,0)
				y = xx
				}

			if(xly2){
                cv.width=xly2.width
                cv.height=xly2.height
                if(!igb) cv.getContext('2d').drawImage(xly2,0,0)
                cv.getContext('2d').drawImage(y, Math.round((xly2.width-y.width)/2), Math.round((xly2.height-y.height)/2))
                    
				cv.style.display=''
				}
			else{
				cv.width=y.width
				cv.height=y.height
				cv.getContext('2d').putImageData(y.getContext('2d').getImageData(0, 0, y.width, y.height),0,0)
				cv.style.display=''
				}
			}
		bb.disabled = false	

	}//


,ehNew = function(data) {
        if(!org1.checked)
            commonui.cutImage(null,data,31|64|128,limit,limit,function(x,addmk,org){
                if(ui.style.display=='none')
                    ui._.show()
                ui._.zsort()
                if(x.width<limit)
                    return alert('选择区域过小 (<'+limit)
                var op = (sha.checked?1:0)|(nb.checked?2:0)
                output(x,addmk,
                    [
                        [limit,			mk1,	ly1,	sp1.value,	op,	cv1],
                        //[limit,			nb.checked ? null : mk2,	nb.checked ? null : ly2,	sp1.value,	sha.checked?1:0,	cv2],
                        [limit,			mk3,	ly3in,	sp1.value,	op,	cv3, ly3ou, 
                            bgc1.value && bgc1.value!='FFFFFF' ? commonui.hexToRgb(bgc1.value) : null],
                        [limitSmall,	mk ,	ly,		sp1.value,	op,	cv]
                    ])
                uploadorgs = org
                },makeGrid())
        }//

,ehBig = function(data) {
    if(!org1.checked)
        commonui.cutImage(null,data,31|64|128,limit,limit,function(x,addmk,org){
            if(ui.style.display=='none')
                ui._.show()
            ui._.zsort()
            if(x.width<limit)
                return alert('选择区域过小 (<'+limit)
            var op = (sha.checked?1:0)|(nb.checked?2:0)
            output(x,addmk,
                [
                    [limit,			mk1,	ly1,	sp1.value, op,	cv1],
                ])
            uploadorgs = org
            },makeGrid())
    }//

,ehSm = function(data) {
    if(!org1.checked)
        commonui.cutImage(null,data,31|64|128,limit,limit,function(x,addmk,org){
            if(ui.style.display=='none')
                ui._.show()
            ui._.zsort()
            if(x.width<limitSmall)
                return alert('选择区域过小 (<'+limitSmall)
            
            var op = (sha.checked?1:0)|(nb.checked?2:0)
            output(x,addmk,
                [
                    [limitSmall,	mk ,	ly,		sp1.value,	op,	cv]
                ])
            uploadorgs = org
            },makeGrid())
    }//

,paste = function(e,f){
var items = e.clipboardData.items, reader = new FileReader()
reader.onload = function(e){f(e.target.result)}
for (var i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image")>-1)
        reader.readAsDataURL(items[i].getAsFile())
    else if(items[i].type.indexOf("text/plain")>-1){
        items[i].getAsString(function(s){
            if(s.match(/^data:(image|img)\/png;base64,/))
                f(s)
            })
        }
    }
commonui.cancelEvent(e)
}//

if(!this.fIconGen.ui)
	this.fIconGen.ui = commonui.createCommmonWindow()
var ui = this.fIconGen.ui
ui._.addContent(null)
ui._.addTitle('生成图标')
ui._.addContent(
	$('/span')._.add('选择图片 > 剪裁合适的区域 > 观察效果 > 提交(有最多15分钟延时)'),
	$('/br'),
	mk = $('/img','style','display:none','src',mkqs),
	mk1 = $('/img','style','display:none','src',mk1s),
	mk2 = $('/img','style','display:none','src',mk2s),
	mk3 = $('/img','style','display:none','src',ly3mask),
	ly = $('/img','style','display:none','src',lyqs),
	ly1 = $('/img','style','display:none','src',ly1s),
	ly2 = $('/img','style','display:none','src',ly2s),
	ly3in = $('/img','style','display:none','src',ly3inner),
	ly3ou = $('/img','style','display:none','src',ly3outer),
	
	
	$('/hr'),
	'大(新)',	$('/br'),
	//cv1 = $('/canvas','style','display:none','width',100,'height',100),
	//cv2 = $('/canvas','style','display:none','width',100,'height',100),
	cv3 = $('/canvas','style','display:none','width',100,'height',100),
    $('/br'),
	file3 = $('/input','type','file','style','margin:0.25em 0','onchange',function(e) {
			var f = e.target.files[0], p = this.parentNode, s = this
			if(f.size>(1024*1536))
                return alert('文件大小不能超过1536k');
			var reader = new FileReader();
			reader.onload = function(e){s._orgFileData = e.target.result;ehNew(e.target.result)}
			reader.readAsDataURL(f);
			}
        ),
    $('/input','placeholder','或粘贴','style','width:3em','onpaste',function(e){paste(e,function(x){file3._orgFileData=x;ehNew(x)});} ),
	$('/button','innerHTML','或使用文字','onclick',function(){
		commonui.textInputer(null,'输入文字',function(t){
			t = t.replace(/^\s+|\s+$/,'')
			if(!t)return
			var cv = $('/canvas','style','display:none','width',512,'height',512), ll = cv.getContext('2d')

			var c=[],hex = Math.abs(DJBHash(t)).toString(16)+'000000'
			for(var i=0;i<6;i+=2)
				c.push( ('0x'+hex.substr(i,2))-0 )

			c[0] = c[1]/255
			c[1] = c[1]/255/2+0.25
			c[2] = c[2]/255/2+0.25

			c = commonui.hsvToRgb(c[0],c[1],c[2])
			ll.fillStyle='#'+( ("0" + c[0].toString(16)).slice(-2) + ("0" + c[1].toString(16)).slice(-2) + ("0" + c[2].toString(16)).slice(-2))
			ll.fillRect(0, 0, cv.width, cv.height);


			ll.font = "bold 128px 'Microsoft YaHei', Sans-serif";
			ll.fillStyle='#ffffff'
			//ll.strokeStyle = ll.fillStyle=='#ffffff' ? '#000000' : '#ffffff'
			//ll.lineWidth = brush.getSize()/5*2
			//ll.strokeText(t,64,256)

			ll.fillText(t,64,256)
			commonui.cutImage(null,cv.toDataURL(),7,limit,limit,output)
			})
		}),
		
	$('/hr'),
	'大(旧)',	$('/br'),
	cv1 = $('/canvas','style','display:none','width',100,'height',100),
	$('/br'),
	file1 = $('/input','type','file','style','margin:0.25em 0','onchange',function(e) {
			var f = e.target.files[0], p = this.parentNode, s = this
			if(f.size>(1024*1536))
				return alert('文件大小不能超过1536k');
			var reader = new FileReader();
			reader.onload = function(e){s._orgFileData = e.target.result;ehBig(e.target.result)}
			reader.readAsDataURL(f);
			}
		),
    $('/input','placeholder','或粘贴','style','width:3em','onpaste',function(e){paste(e,function(x){file1._orgFileData=x;ehBig(x)});} ),
	$('/hr'),
	'小',	$('/br'),
	
	cv = $('/canvas','style','display:none','width',100,'height',100),
	$('/br'),
	file0 = $('/input','type','file','style','margin:0.25em 0','onchange',function(e) {
			var f = e.target.files[0], p = this.parentNode, s = this
			if(f.size>(1024*1536))
				return alert('文件大小不能超过1536k');
			var reader = new FileReader();
			reader.onload = function(e){s._orgFileData = e.target.result;ehSm(e.target.result)}
			reader.readAsDataURL(f);
			}
        ),
    $('/input','placeholder','或粘贴','style','width:3em','onpaste',function(e){paste(e,function(x){file0._orgFileData=x;ehSm(x)});} ),
    
    ' ',sr = $('/input','type','checkbox','onchange',function(){
        if(this.checked){
            ly.src = lyrs
            mk.src=mkrs
            }
        else{
            ly.src=lyqs
            mk.src=mkqs
            }
        }),'圆',

	$('/hr'),

	nb = $('/input','type','checkbox'),'不加框 / ',
	sha = $('/input','type','checkbox','checked','checked'),'阴影 / ',
	sp1 = $('/input','size','5','placeholder','0.0~0.5'),'锐化 / ',
	bgc1 = $('/input','size','6','title','设置为白色时会忽略底色','onmousedown',function(){
		if(!window.__COLOR_PICKER){
			var s = this
			__SCRIPTS.asyncLoad(__COMMONRES_PATH+'/js_color_picker.js',function(){__COLOR_PICKER.installOnElement(s);__NUKE.fireEvent(s,'mousedown')})
			}
		}),'底色 / ',
	org1 = $('/input','type','checkbox'),'传原图',
	$('/br'),
	$('/br'),
	ff = $('/input','size','10','placeholder','版面ID'),
	tt = $('/input','size','10','placeholder','或合集ID'),
	bb = $('/button','innerHTML','提交','onclick',function(){
		var f0='',f1='',f3=''
		if(org1.checked){
			f0 = file0._orgFileData?file0._orgFileData:''
			f1 = file1._orgFileData?file1._orgFileData:''
			f3 = file3._orgFileData?file3._orgFileData:''
			}
		else{
			f0 = cv.style.display=='' ? cv.toDataURL().replace(/^data:image\/png;base64,/,'') :''
			f1 = cv1.style.display=='' ? cv1.toDataURL().replace(/^data:image\/png;base64,/,'') :''
			f3 = cv3.style.display=='' ? cv3.toDataURL().replace(/^data:image\/png;base64,/,'') :''
			}
		__NUKE.doRequest({
			u:{u:__API._base+'__lib=modify_forum&__act=set_icon',
				a:{fid:ff.value|0,
                    tid:tt.value|0,
                    raw:3,
					img:f0,
					img1:f3,
                    img2:f1}//,
                    //imgo:uploadorgs}
				},
			b:this
			})
		})
	)
ui._.show()
}//fe


}///if adminui


commonui.imageCanvasResize = function(im,xl,yl,opt){
var l=im._log,si = function(o,c,t){
	if(o>t){
		if(c<=t)
			return
		var r = t/c
		if(r>=0.5)
			return t
		else
			return Math.round(c*r)
		}
	else if(o<t){
		if(c>=t)
			return
		var r = t/c
		if(r<=2)
			return t
		else
			return Math.round(c*r)
		}
	}
if(!yl && !xl)
	return im
if(!yl)
	yl = Math.round(xl * im.height/im.width)
if(!xl)
	xl = Math.round(yl * im.width/im.height)
if(opt&1)
	return commonui.imageCanvasDownScaleHighQuality(im,xl ,yl)
var cx = im.width , cy = im.height, n=im,i=0
if(l)
	console.log(im.width,im.height,xl,yl)
while((cx = si(im.width,cx,xl)) + (cy = si(im.height,cy,yl))){
	y = document.createElement( 'canvas' )
	y.width = cx ? cx : n.width
	y.height = cy ? cy : n.height
	y.imageSmoothingQuality ='high'
	if(l)
		console.log(y.width,y.height)
	y.getContext( '2d' ).drawImage(n,0,0,y.width,y.height)
	n = y
	if(i++>10)
		break
	}
	if(l)
		console.log(1)
return n
}//fe


//剪裁图像
//如选区长或宽大于给定值则等比缩小至给定值以下
commonui.cutImage = function(e,
	img,
	opt,//&1选区保持长宽比 &2确定后不关闭窗口 &4扩大选区 &8添加mask功能 &16返回cavans &32中央位置打开 &64超过窗口宽度则缩小 &128超过窗口高度则缩小
	lw,
	lh,
	cb,//callback
	mk//selectmask
	){
if(!this.cutImage.w)
	this.cutImage.w = this.createCommmonWindow()
var $=_$,bd=5,w = this.cutImage.w, smode, om ,pos, poss,im, sx,sy,sw,sh,tmks=[],insertmaskhere,grid,downSize = this.imageCanvasResize, 
redraw=function(ps){
	om.getContext('2d').clearRect(0, 0, om.width, om.height)
	var x=om.width,y=om.height,w=0,h=0
	for(var i=0;i<ps.length;i++){
		if(ps[i].x<x)
			x = ps[i].x
		if(ps[i].y<y)
			y = ps[i].y
		if(ps[i].x>w)
			w = ps[i].x
		if(ps[i].y>h)
			h = ps[i].y
		}
	w=w-x
	h=h-y
	if(w && h){
		ps.avil=1
		sx=x,sy=y,sw=w,sh=h
		om.getContext('2d').fillRect(x , y, w,  h)
		om._cutarea = [x , y, w,  h]
		if(mk){
			var tm = mk
			if(w<0){
				x+=w
				w=-w
				}
			if(h<0){
				y+=h
				h=-h
				}
			if(tm.width!=w){
				tm = downSize(tm,w)
				om.getContext('2d').drawImage(tm,x , y)
				}
			}
		}
	else{
		ps.avil=0
		resetQr()
		}
	},//
drln=function(x,y){
	grid.getContext('2d').clearRect(0, 0, om.width, om.height)
	grid.getContext('2d').fillRect(x , 0, 1, om.height)
	grid.getContext('2d').fillRect(0 , y, om.width ,1)
	},//
clearTmks = function(){
	var x
	while(x=tmks.pop())
		x.parentNode.removeChild(x)
	},//
evPos = function(e, o){
	var pos = __NUKE.position.get(e)
	,cr = o.getBoundingClientRect()
	pos.x = Math.round(pos.cx-cr.left)
	pos.y = Math.round(pos.cy-cr.top)
	return pos
	},//
ifInSelect = function(p,ps){
	if(!ps.avil)return
	var i=0,j = 0
	for(;i<ps.length;i++){
		if(ps[i].x>=p.x)
			j|=1
		if(ps[i].x<=p.x)
			j|=2
		if(ps[i].y>=p.y)
			j|=4
		if(ps[i].y<=p.y)
			j|=8
		}
	if(j==15)
		return 1
	},//
closestP = function(x,y,p){//最近的点
	if(!p.avil)return false
	var mi = 100,id = false
	for(var i=0;i<p.length;i++){
		if(typeof(p[i])!='object')
			continue
		var dx = x-p[i].x,dy=y-p[i].y,d = dx*dx+dy*dy
		if(d<mi){
			mi = d
			id = i
			}
		}
	return id
	},//
reDrawTrMsk = function(cv,p,co){//重绘三角mask
	if(!om._cutarea)
		return
	var ph = new Path2D(),j
	for(var i=0;i<p.length;i++){
		if(typeof(p[i])!='object')
			continue
		if(j)
			ph.lineTo(p[i].x, p[i].y)
		else{
			j=1
			ph.moveTo(p[i].x, p[i].y)
			}
		}
	ph.closePath()
	cv.getContext('2d').fillStyle = co?co:'#ff00aa'
	cv.getContext('2d').clearRect(0, 0, cv.width, cv.height)
	cv.getContext('2d').fill(ph)
	},//
switchTr = function(x){
    var p = grid.nextSibling
    if(p == insertmaskhere)
        return
    grid.parentNode.removeChild(p)
    grid.parentNode.insertBefore(p,insertmaskhere)
    resetMaskOp()
    },//
resetMaskOp = function(){
    p = grid.nextSibling
    if(p == insertmaskhere)
        return
    while(p){
        if(p==insertmaskhere)
            break
        p.style.opacity = 0.15
        p = p.nextSibling
        }
    insertmaskhere.previousSibling.style.opacity = 0.3
    },//
resetQr = function(){
	sx=sy=0
	sw = om.width
	sh = om.height
	om.getContext('2d').clearRect(0, 0, sw, sh)
	om._cutarea = null
	},//
resetAll = function(){
	resetQr()
	clearTmks()
	}
	
w._.addContent(null)
w._.addTitle('剪切图片')
w._.addContent(
	$('/button','innerHTML','确定','style','marginBottom:0.5em','onclick',function(){
		if(!sw || !sh){
			sw = om.width
			sh = om.height
			sx=sy=0
			}
		var x= document.createElement( 'canvas' ),y
		x.width=sw
		x.height=sh
		//console.log(sx, sy, sw, sh, lw,lh)
		x.getContext('2d').drawImage(im, sx, sy, sw, sh, 0, 0, sw, sh)
		if(tmks.length){
			y= document.createElement( 'canvas' )
			y.width=sw
			y.height=sh
			for(var i=0;i<tmks.length;i++)
				y.getContext('2d').drawImage(tmks[i], sx, sy, sw, sh, 0, 0, sw, sh)
			}
		var rx = sw/lw,	ry = sh/lh
		if(rx<=1 && ry<=1){

			}
		else{
			if(rx>ry){
				if(x.width>lw){
					x = downSize(x,lw,null,1)
					if(y)
						y = downSize(y,lw,null,1)
					}
				}
			else{
				if(x.height>lh){
					x = downSize(x,null,lh,1)
					if(y)
						y = downSize(y,null,lh,1)
					}
				}
			}
		if(opt&16)
			cb(x,y?y:null,im.src)//返回裁剪的图 ,附加的mask, 原图
		else
			cb(x.toDataURL(),y?y.toDataURL():null,im.src)
		if(opt&2==0)
			w._.hide()
		}),$('/button','innerHTML','重置','onclick',function(){resetAll()

		}),$('/br'),$('/br'),
	im = $('/img','style','display:none;outlineWidth:'+bd+'px;outlineStyle:solid;outlineColor:'+__COLOR.border0,'src',''),
	grid = $('/canvas','style','display:none;cursor:crosshair;'),
	om = $('/canvas','style','display:none;cursor:crosshair;',
		'_p',{c:false,0:{x:0,y:0},1:{x:0,y:0},2:{x:0,y:0},3:{x:0,y:0},length:4,avil:0},
		'onmousedown',function(e){
			if(e.timeStamp - w._._commonWindowfocusTime < 100)
				return
			pos = evPos(e,this)
			var i, q=this._p
			if(q && q.avil && (i = closestP(pos.x,pos.y,q))!==false){
				q.c = i
				smode = 1
				}
			else if(ifInSelect(pos,q)){
				smode = 2
				q.sx = pos.x
				q.sy = pos.y
				}
			else{
				smode = 1
				q.c = 2
				q[0]=pos
				q[1]={x:pos.x,y:pos.y}
				q[2]={x:pos.x,y:pos.y}
				q[3]={x:pos.x,y:pos.y}
				q.avil=0
				redraw(q)
				}
		},'onmousemove',function(e){
			var p = evPos(e,this)
			//if(!smode)
				//return drln(p.x,p.y)
			var q = this._p
			q.avil=1
			if(smode&1){
				var pos = q[(q.c+2)%4]
				if(opt&1)
					p.y = Math.round(Math.abs((p.x-pos.x)/lw*lh)*(p.y<pos.y?-1:1))+pos.y
				q[(q.c-1)%4]={x:p.x,y:pos.y}
				q[q.c]=p
				q[(q.c+1)%4]={x:pos.x,y:p.y}
				redraw(q)
				}
			else if(smode&2){
				var x = p.x-q.sx, y=p.y-q.sy, i=0
				for(;i<q.length;i++){
					q[i].x+=x
					q[i].y+=y
					}
				q.sx = p.x
				q.sy = p.y
				redraw(q)
				}
		},'_up',function(e){
			smode=0
		},
		'onmouseup',function(e){this._up(this,e)},
		'onmouseout',function(e){this._up(this,e)}
		),
	insertmaskhere = $('/br'),$('/br'),
	$('/button','type','button','innerHTML','X+','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sx++
			redraw(sx , sy, sw,  sh);
		}),
	$('/button','type','button','innerHTML','X-','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sx--
			redraw(sx , sy, sw,  sh);
		}),
	$('/button','type','button','innerHTML','Y+','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sy++
			redraw(sx , sy, sw,  sh);
		}),
	$('/button','type','button','innerHTML','Y-','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sy--
			redraw(sx , sy, sw,  sh);
		}),$('/br'),
	$('/button','type','button','innerHTML','W+','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sw++
			redraw(sx , sy, sw,  sh);
		}),
	$('/button','type','button','innerHTML','W-','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sw--
			redraw(sx , sy, sw,  sh);
		}),
	$('/button','type','button','innerHTML','H+','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sh++
			redraw(sx , sy, sw,  sh);
		}),
	$('/button','type','button','innerHTML','H-','onclick',function(){
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
			sh--
			redraw(sx , sy, sw,  sh);
		}),
	opt&8? [
		$('/br'),

		$('/button','type','button','innerHTML','添加一个三角蒙版','onclick',function(){
			if(!om._cutarea)
				return
			var y = document.createElement( 'canvas' )
			y.width = om.width
			y.height = om.height
			y.style.marginLeft = '-'+y.width+'px'
			y.style.opacity = 0.3
			y._p ={c:false, 0:{x:(om._cutarea[2]/2+om._cutarea[0])|0, y:(om._cutarea[3]/2+om._cutarea[1])|0}, length:3, avil:1}
			var tmp = Math.random(),tmq = om._cutarea[2]*0.4
			y._p[1] = {x:(y._p[0].x+tmq*tmp)|0 , y:(y._p[0].y+tmq*(1-tmp))|0}
			tmp+=0.3
			if(tmp>1)
				tmp-=1
			y._p[2] = {x:(y._p[0].x+tmq*tmp)|0 , y:(y._p[0].y+tmq*(1-tmp))|0}
			commonui.aE(y,'mousedown',function(e){
				if(e.timeStamp-w._._commonWindowfocusTime<100)
					return
				var p = evPos(e,this),q = this._p
				q.c = closestP(p.x, p.y, q)
				if(q.c!==false){
					q[q[0]] = {x:p.x, y:p.y}
					reDrawTrMsk(this,q)
					}
				})//
			commonui.aE(y,'mousemove',function(e){
				if(this._p.c!==false){
					var p = evPos(e,this),q = this._p
					q[q.c] = {x:p.x, y:p.y}
					reDrawTrMsk(this,q)
					}
				})//
			commonui.aE(y,'mouseup',function(e){
				this._p.c = false
				})//
			commonui.aE(y,'mouseout',function(e){
				this._p.c = false
                })//
            reDrawTrMsk(y,y._p,'#ff00aa')
            grid.parentNode.insertBefore(y,insertmaskhere)
	        tmks.push(y)
            resetMaskOp()
			}),
		$('/button','innerHTML','切换','onclick',function(){
				switchTr()
				}),
		$('/button','innerHTML','重置','onclick',function(){
				clearTmks()
				})
		]:null
	)
im.onload=function(){
	if((opt&4)&&!im.__padded){
		om.width=Math.round(im.width*1.7)
		om.height=Math.round(im.height*1.7)
		om.getContext('2d').drawImage(im, 0, 0, im.width, im.height, (im.width*0.35)|0, (im.height*0.35)|0, im.width, im.height)
		im.src = om.toDataURL()
		im.__padded = 1
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
		return
		}
	if((opt&192)&&!im.__zoomed){
		var p=__NUKE.position.get()
		if((opt&64) && om.width>p.cw*0.9){
			om.height=p.cw*0.9/om.width*om.height
			om.width=p.cw*0.9
			}
		if((opt&128) && om.height>p.ch*0.9){
			om.width=p.ch*0.9/om.height*om.width
			om.height=p.ch*0.9
			}
		om.getContext('2d').drawImage(im, 0, 0, im.width, im.height, 0, 0, om.width, om.height)
		im.src = om.toDataURL()
		im.__zoomed = 1
		om.getContext('2d').clearRect(0, 0, om.width, om.height)
		return
		}
	//im.style.marginRight='-'+(im.width)+'px'
    grid.style.marginLeft='-'+(im.width)+'px'
    grid.style.opacity=0.3
    om.style.marginLeft='-'+(im.width)+'px'
    om.style.opacity=0.3
	om.width=im.width
	om.height=im.height
	grid.width=im.width
	grid.height=im.height
	im.style.display=om.style.display=grid.style.display=''
	om.getContext('2d').fillStyle = '#00ccff'
	//om.getContext('2d').globalAlpha= 0.3
	grid.getContext('2d').fillStyle = '#cccccc'
	//grid.getContext('2d').globalAlpha= 0.3
	w._.show((opt&32)?null:e)
	}
im.src = img
w._.show((opt&32)?null:e)
}//fe


//设置头像=====================
commonui.setAvatar2 = function (e,uid,ad){
if(!__CURRENT_UID)
	return alert('需要先登陆')
var av={},LIM=5,checksum='nochecksum',NEW='new',OTHER='other',KEEP='keep',
imc,y,y1,y2,y3,$=_$,
uu = function(im){
	var m
	//if(m = im.match(/\/[0-9a-z]{3}\/[0-9a-z]{3}\/[0-9a-z]{3}\/(\d+)_(\d+)\.(jpg|png|gif)\?(\d+)$/i)){//完整的本站头像地址还原成缩写
	//	if(m[1]==uid)
	//		im = '.a/'+m[1]+'_'+m[2]+'.'+m[3]+'?'+m[4]
	//	}
	im = commonui.avatarReal2Short(im,uid)
	if(im.match(/^https?:\/\//))
		return [im,OTHER,'']
	else if(m = im.match(/^\.a\/(\d+)_(\d+)\.(jpg|png|gif)\?(\d+)/))
		return [__AVATAR_BASE_VIEW+'/'+('000000000'+(m[1]|0).toString(16)).replace(/.+?([0-9a-z]{3})([0-9a-z]{3})([0-9a-z]{3})$/,'$3/$2/$1')+'/'+m[1]+'_'+m[2]+'.'+m[3]+'?'+m[4],
			KEEP,(av[m[2]]=m[2])]
	else if(im.match(/^data:image\/(png|jpeg);base64,/)){
		for(m=0;m<LIM*2;m++){
			if(av[m]===undefined)
				return [im,NEW,(av[m]=m)]
			}
		return alert('不能添加更多了')
		}
	else
		return null
	},//
n = function(im){
	im = uu(im)
	return im ? [$('/img','title',im[2],'alt',im[1],'src',im[0],'style','border:5px solid '+__COLOR.border0),
				$('/a',__TXT('close'),'style','marginLeft:-5px;verticalAlign:1em','className','small_colored_text_btn block_txt_c0','href','javascript:void(0)','onclick',function(){
					var p = this.previousSibling
					delete av[p.title]
					this.parentNode.removeChild(p)
					return this.parentNode.removeChild(this)
					}),
				' '] : null
	}//
this.createadminwindow()
this.adminwindow._.addContent(null)
this.adminwindow._.addTitle('设置头像'+(uid==__CURRENT_UID?'':' UID:'+uid))
this.adminwindow._.addContent(imc = $('/div'),
	y=$('/span','style','display:none')._.add(
		'多个头像的显示方式 ',
		y1=$('/input').$0('type','radio','name','sa1234','checked','checked'),
		'随机 ',
		y2=$('/input').$0('type','radio','name','sa1234'),
		'时段 ',
		$('/br')
		),
	(ad && uid!=__CURRENT_UID)?$('/div')._.add(
		' 禁止重设头像',
		y3=$('/select')._.add(
			$('/option','innerHTML','--','value',0),
			$('/option','innerHTML','3天','value',3),
			$('/option','innerHTML','7天','value',7),
			$('/option','innerHTML','15天','value',15),
			$('/option','innerHTML','30天','value',30),
			$('/option','innerHTML','60天','value',60)
			),
		$('/br')
		):null,
	'添加一个头像 ',
	$('/input','type','file','style','margin:0.25em 0','onchange',function(e) {
			var f = e.target.files[0], p = this.parentNode
			if(f.size>(1024*15360))
				return alert('文件大小不能超过15360k');
			var reader = new FileReader();
			reader.onload = function(e) {
				commonui.cutImage(null,e.target.result,0,180,255,function(im){
					imc._.add(n(im))
					})
				}//
			reader.readAsDataURL(f);
			}
		),
	$('/br'),
	$('/button').$0('innerHTML','确定','type','button','onclick',
		function(){
			var x = imc.getElementsByTagName('img'),k=0,a={}
			for(var i=0;i<x.length;i++){
				if(x[i].alt==KEEP || x[i].alt==NEW){
					a['n'+uid+'_'+x[i].title] = x[i].alt==KEEP ? KEEP : x[i].src
					k++
					}
				}
			if(k>LIM)
				return alert('不能超过'+LIM+'个')
				
			a.func='upload'
			a.avatar=1
			a.uid=uid
			a.lite='js'
			a.checksum=checksum
			console.log(a)
			__NUKE.doRequest({
				u:{u:__ATTACH_BASE+'/attach.php',a:a},
				f:function(d){
					var e = __NUKE.doRequestIfErr(d)
					if(e)
						return alert(d.error_code == 12 ? '操作超时 请重新设置':(d.error_code == 6 ? '图片格式错误' :'unknow error'))
					
					var d = d.data,x = imc.getElementsByTagName('img'),a=''
					if(d&&d[0])d=d[0]
					for(var i in x){
						if(x[i].alt==KEEP || x[i].alt==NEW)
							a+='\t.a/'+uid+'_'+x[i].title+'.'+(d.isImg=='png' ? 'png' : 'jpg')+'?'+(Math.random()*100|0)+'\t'+( x[i].alt==NEW?'new':'')+'\t'
						else if(x[i].alt==OTHER)
							a+='\t'+x[i].src+'\t\t'
						}
					__NUKE.doRequest({
						u:__API.setAvatar(uid,a,y3?y3.options[y3.selectedIndex].value:''),
						b:this,
						f:function(d){
							var e = __NUKE.doRequestIfErr(d)
							if(e)
								return alert(e)
							alert(d.data[0])
							}
						})
					},
				xr:1
				})
			})
	)
__NUKE.doRequest({
	u:{u:__API._base,
		a:{__lib:"set_avatar",__act:"get",uid:uid,edit:1,raw:3}
		},
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		if(d.data[1])
			checksum = d.data[1]
		var d = d.data[0]+''
		if (d.constructor==String)
			d = commonui.allAvatar(d)
		if(d && d.l){
			if(d.l>1){
				y.style.display=''
				if(d.t==2){
					y2.checked='checked'
					y1.checked=''
					}
				}
			for(var i=0;i<d.l;i++)
				imc._.add(
					n(d[i].constructor==String?d[i]:d[i][0])
					)
			}
		}
	})
this.adminwindow._.show(e)
}//fe


commonui.imageSharpen =function(ctx, w, h, mix) {
    var x, sx, sy, r, g, b, a, dstOff, srcOff, wt, cx, cy, scy, scx,
        weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
        katet = Math.round(Math.sqrt(weights.length)),
        half = (katet * 0.5) | 0,
        dstData = ctx.createImageData(w, h),
        dstBuff = dstData.data,
        srcBuff = ctx.getImageData(0, 0, w, h).data,
        y = h;

    while (y--) {
        x = w;
        while (x--) {
            sy = y;
            sx = x;
            dstOff = (y * w + x) * 4;
            r = 0;
            g = 0;
            b = 0;
            a = 0;

            for (cy = 0; cy < katet; cy++) {
                for (cx = 0; cx < katet; cx++) {
                    scy = sy + cy - half;
                    scx = sx + cx - half;

                    if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
                        srcOff = (scy * w + scx) * 4;
                        wt = weights[cy * katet + cx];

                        r += srcBuff[srcOff] * wt;
                        g += srcBuff[srcOff + 1] * wt;
                        b += srcBuff[srcOff + 2] * wt;
                        a += srcBuff[srcOff + 3] * wt;
                    }
                }
            }

            dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
            dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
            dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix);
            dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
        }
    }

    ctx.putImageData(dstData, 0, 0);
}


//==============================================
//发帖附件编辑
//==============================================
commonui.imageEditor = function(e,im,callback){

if(im.constructor==String){
	var i = new Image()
	i.onload = function(){
		commonui.imageEditor(e,this,callback)
		}
	i.src=im
	return
	}

var $= _$, og, mk, tp, fn, pstimg,cpstimg





var croquis = new Croquis();
croquis.setCanvasSize(im.width, im.height);
croquis.addLayer();
//croquis.fillLayer('#aaaaaa');
croquis.setToolStabilizeLevel(10)
croquis.setToolStabilizeWeight(0.5)
croquis.setUndoLimit(10)

var blog=[]
var brush = new Croquis.Brush();
brush.__downbak = brush.down
brush.down = function(x, y, pressure){
	if(fn==2)
		blog=[]
	else if(fn==3)
		return
	else if(fn==4){
		return
		}
	return brush.__downbak(x, y, pressure)
	}//fe
brush.__movebak = brush.move
brush.move = function(x, y, pressure){

	if(fn==2){
		if(Math.abs(x-blog[blog.length-2])<0.2 && Math.abs(y-blog[blog.length-1])<0.2){}
		else{
			blog.push(x,y)
			if(blog.length>200)
				blog=blog.slice(blog.length-40)
			}
		}
	else if(fn==3)
		return
	else if(fn==4){

		return
		}
	return this.__movebak(x, y, pressure)
	}//fe

brush.__upbak = brush.up
brush.up = function(x, y, pressure){
	
	if(fn==2){
		blog.push(x,y)
		var i=blog.length-20
		if(i<0)return
		var bz=brush.getSize(), lx = blog[blog.length-2], ly = blog[blog.length-1], sx = blog[i], sy = blog[i+1]
		var a = Math.atan((ly-sy)/(lx-sx)), sina = Math.sin(a), cosa = Math.cos(a)
		var tc = cosa*bz*2, ts = sina*bz*2,
		t0x = lx>sx ? lx+tc : lx-tc,
		t0y = lx>sx ? ly+ts : ly-ts,
		t1x = lx-ts,
		t1y = ly+tc,
		t2x = lx+ts,
		t2y = ly-tc,
		minx = Math.min(t0x,t1x,t2x),
		miny = Math.min(t0y,t1y,t2y)
		brush.addDirtyRect(minx,miny,Math.max(t0x,t1x,t2x),Math.max(t0x,t1x,t2x))
		blog=[]
		
		window.setTimeout(function(){

			var ll = croquis.getLayerCanvas(0).getContext('2d')
			ll.beginPath()
			ll.moveTo(t0x,t0y)
			ll.lineTo(t1x,t1y)
			ll.lineTo(t2x,t2y)
			ll.lineTo(t0x,t0y)
			ll.closePath()
			ll.fillStyle=brush.getColor()
			ll.fill()

			//ll.fillStyle='#0000ff'
			//ll.fillRect(lx,ly,1,1)
			//ll.fillRect(sx,sy,1,1)
			})
		}
	if(fn==3){
		commonui.textInputer(null,'输入文字',function(t){
			t = t.replace(/^\s+|\s+$/,'')
			if(t){
				var ll = croquis.getLayerCanvas(0).getContext('2d')
				ll.font = "bold "+(brush.getSize()*3)+"px 'Microsoft YaHei', Sans-serif";
				ll.fillStyle=brush.getColor()
				ll.strokeStyle = ll.fillStyle=='#ffffff' ? '#000000' : '#ffffff'
				ll.lineWidth = brush.getSize()/5*2
				ll.strokeText(t,x,y)
				ll.fillText(t,x,y)
				}
			})
		return
		}
	if(fn==4){
		return
		}
		
	var r = this.__upbak(x, y, pressure)
	
	}//fe
brush.setSize(5);
brush.setColor('black');
brush.setSpacing(0.2);

croquis.setTool(brush);
fn=1

var c1 = 'display:inline-block;marginBottom:-0.25em;width:1.5em;height:1.5em;backgroundColor:';

if(!this.imageEditorW){
	this.imageEditorW = this.createCommmonWindow()
	document.body.appendChild(this.imageEditorW)
	}

this.imageEditorW._.addContent(null)
this.imageEditorW._.addTitle('编辑图片')
this.imageEditorW._.addContent(
	$('/span')._.add(
		og = $('/canvas','style','display:none'),
		mk = $('/canvas','style','display:none'),
		tp = croquis.getDOMElement(),
		$('/br'),
		'功能',$('/select',
			$('/option','innerHTML','画线','value',1),
			$('/option','innerHTML','画线(带箭头)','value',2),
			$('/option','innerHTML','插入文字','value',3),
			$('/option','innerHTML','贴画','value',4),
			'onchange',function(){
				fn=this.value
				}
			),
		' 颜色',$('/span','onclick',function(e){
						for(var i=0;i<this.childNodes.length;i++)
							this.childNodes[i].style.border=''
						e.target.style.border='2px solid #000'
						brush.setColor(e.target.style.backgroundColor)
						},
					$('/div','style',c1+'dodgerblue'),
					$('/div','style',c1+'crimson'),
					$('/div','style',c1+'lightseagreen'),
					$('/div','style',c1+'goldenrod'),
					$('/div','style',c1+'white'),
					$('/div','style',c1+'black')
			),' 尺寸',
		$('/select',
			$('/option','innerHTML','5','value','5'),
			$('/option','innerHTML','10','value','10'),
			$('/option','innerHTML','15','value','15'),
			'onchange',function(){
				brush.setSize(this.value|0)
				}
			),' ',
		$('/button','innerHTML','UNDO','onclick',function(){croquis.undo()}),
		//$('/button','innerHTML','PEN','onclick',function(){po = po ? null : []}),
		$('/button','innerHTML','确定','onclick',function(){
			og.getContext('2d').drawImage(croquis.getLayerCanvas(0),0,0)
			callback(og.toDataURL('image/jpeg',0.85), commonui.resizeImg(og,160,90,1))
			commonui.imageEditorW._.hide()
			window.setTimeout(function(){croquis=brush=null;commonui.imageEditorW._.addContent(null)})
			}),//bu
		$('/br'),
		
		$('/span','onclick',function(e){
				for(var i=0;i<this.childNodes.length;i++)
					this.childNodes[i].style.border=''
				e.target.style.border='2px solid #000'
				pstimg = e.target
				},

			$('/img','src',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAxlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATEQXczR7bzj3RwTYcGwj89mrk2EKTeQfVwyn27k27qz3Juj7v40bGtBmtmA4LCwKyoiHFsS63oinw5lnj1S759Xl3bhrMvRhcUwe9qhu3oBLv5jL571r5+37//p/7941oXAupkypKRhR9ejIzLAGliBawoDvx7Gnj2VOHcwScgQLi2RxZViWLij7SznPaFV0YAAAAQnRSTlMAp/gJNy+0RHW97OBPzREukGP///////////////////////////////////////////////////////////////9FUkEOAAABzUlEQVQ4y31TYW/aMBB9jmMcTEjCUOkmlUmMVhPS/v+vGRudVECsISUyOMZObl+2iqyk/nZPz3fv7t4BrZewURtA8F84O4j3COI8vfHvEXw/WIzCFtSKRP1tY0T7D2+x06OwU+2bjhJhPGcKB8a6NNSZiAA5icX1EkIuvtthlFleV1cz8GidJPSCbb8MrxCS7Dwv8hI1QDdSvhL+CkrOQTR/FDGDpDVS/Zu4v9DAJfW/upOopk/GHjlnzd2QwOt/GWRPzLcEBcjERD+DGreI3ZKM8wDnGVPRwxPGKqu0caFTZmhFXhyDmZZ1bNlQiMW6BICPak0joGqOEwAM6y9+SSc2kPN9rZ6Tvg6aW12VUc+CoQeC0h9WdGKpDaIHwbAE5u7XZ39AupNAo7TakuGGW9+vnovMTgoU6WGAodow7wd+kB80rCUGAFwEEbsXP8abjFWVIro7r8iRfp0D+aa2OrM200lfO3x6zE1Qni8nCSBSs1wh3ACMaW/fbtNXEZyDYWxcWnttm+FKxQCAnbFX1+3CLYtzYExdlmuKBkCyc7bD1Z4ZQk+Q6bwL/qKAvfGdtm9qlcryXHdfFq3Y/rKFNwRHxnF0XxYgG1tRC/kDy4XXkwoNxH4AAAAASUVORK5CYII='
			,'style','height:1em'),
			$('/img','src',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA2FBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUhbbV5e6ArMl3pMRjk71NdqsQFRhOe6/k8PTq9vkJCwze6e+30+EVHSSIss2fxNpdjLiUuc1nlsPN3+ZunMFTgbK92+zL5vEpN0P0+vrY6/gjKzCPoq1BW3CTvdlEY4Fhb3UxSmGqydnF3uxOUlRNdJyn0eZxeHpGapKOmJy0v8JfhZ6FiYuIqMBwl7NZW1tDSUy5xch9lJ+AkZixZrlPAAAASHRSTlMA5l6suWxDDfUv1X6WU4kcoc2a//////////////////////////////////////////////////////////////////////9ZSYmGAAACHUlEQVQ4y3XTS3PTMBQF4KMry7Jjx3aebSAUaKczLFjw//8FO5gpj7ZAoClOmjqRJVkWC0jbtEHLcz5dLe6I4+GJI8dZ4mVzHwU7QHIppdbrgMw24jvAowrktHsgYLdTdoEzrVZmwIfjWklyTwEAT7VZlrY9XXmzF8ARH4fX+e+TJVkA9ATA2NkAbLR6F3X3A+i1xvyiczat5L4nAAeyGM3opW303glo128w72cfnhm5HyRQBeYSYdLuB0CLovjmz6f+f4CqCgU2cSApLOSe+9+zrFo9h0gsJdw+AT4riDIo3CImjfxxH8fFYrEgDygpuUjbpn00YLAEUGcihGlIygmPd3pRDLz33guHWGtybtSvHwrikx8AkLK1PoDilk9Bign3t86b3vFwY4CU8V6yWXoeiaiMxrbKfOAkT8zkhF2RMAgjrVTwS/GGUUebg7dXMvSpzE4HH8kwLsLDG2LpQtkAdpUzL98Px7ySdLkoO2Vfg1tUPmVXDAGonCbrCvUXQKMPoFMe37L2E9irM+vA4YQuNnXPeMZCqxSEC8RNu2Gspy47GhwQio50zJMoUtxBesZGFmEY5pf1BuCA687N0VeVW16zYaozhJo4Lyef3QYAA4DQvhidAwgyoJRABiwHs2WgtwA50aR7ge1OCIczra3GHYAU6/6UflILgF7r65Vq/v1OdrdjedOHlADcGqoWGo8AgLhpGYBIB+o+/AOUEu8rSA9utgAAAABJRU5ErkJggg=='
			,'style','height:1em'),
			$('/img','src',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABblBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADdVQDmYQDiWgDIPwH9kgDNWQLoegLRSQL3jgDsZgL1hgH4iQDVSQD4mRv813vHOQAMBgHwkBD/zmLxcwLmbADGTgDgZgTwjQUdCwDuhwW1OgD5kgPrbAT2fAL/sDXqgwj8jgHoZQDOQwD6ggD+qRnYSgDATgvhbQThchW+RgLaTwC9NwCjNwDrhRLznCtUIALYaQ4UDQTgUADkVwH+uD/aWwjVTgT5oCbukCD3pDT/lgC6PwDrhiH+ylrJUgblfyD/1HDUch/cex76kBGIJwD3gg7/uS//yVD6mAlzJAA0HAbUYgL/wEzytVJ/Zi0iGgv4iA6wUQD/4Iu1LwD1v1qjhT97WxySRQP4ynDeYAzzkhnrmznAiy1UQBTtwnHejTqtYwrKXRSul1eKXBrlq0PxrEV9Pglx7xcTAAAAenRSTlMAFfRHreXaCzGdXVTIlHSFZGL//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7PSmAMAAAMxSURBVDjLZZPLbxtVFMa/e+88ru2xXWdsnGTyoG7SOk1QSYiygVZFFC+66gKpG+iSv4xlhcqCRdUKVZQKSEB50IdL4jhF+BXb8dgz45mxZ+aySGhLOaujT985Rzrn/AjeBKdyBIBS13sjkn8TVfU0YA1AtQebW+IdA2PaLZG9ixsPgS865J6VcH0AgHRarjhfKvdv3MVNAGuHe/jq5PuQiNcdVBq7Q2xohD4BYMydWMiOfmw54syg0tjtxu7NVrN/Nk8z9B/w2YOWIwAGIKHeftgo7TSms3+OPM+znYsHg2vxn0otl4VgAHe/Pqlffc7sfnra3xivvGdUOwumnLOLFckDgypfnXXn+m7h6cpmjR/35N3aENyz0xFf2FYCCZKytoOgtnEfm3kELXmQRwuVCzQIxETSBYOYdLpy3fQGM6m268uZcc+llPaj9rSy+emuJIHMc4xMgpk22LlYAYerjxhC2OtPF6BqvsTjxY5bKZUbADKxC1vAwfXHYEALsV4cTGKIJX1sJXUoTUDGclwc5I6n0OjQE3y39kQS6DsKIhDj78ljtldw3WNQfXTxg8dY1fEMVD1dnm84QxNG7yV7OfVJOCwyC+Y3yeTZsQR4TanRyeYOUI1VqwmS/fYKAKcMMCot/ZJL7eskka5GYRjajuOYbs+sTzilZ0PWoz6UYejqSbmLjfi6LKtqoaC+3+WGvFwZ6p7ClKFWmwvqpBGYtdirKIqiUJ99HgTcT+lH138bS75EcTSjdwUFCYtAEbgnCJCpei4sizLw9kpabWixS3UxctWK/uDVchMREvbidmbHHzPQ0cd20BZy5XL7cl67Nl739pay3cmMdyAWy3LAEKb2V23X6HGXxkdV6j6y56P9fKTxzsqe8MAA4VmJdsLI9p223ut386l9O+f5iVraa44ABoTCInNjdbFcIONhEAzi8XPOJf3wivlCRKc/CcUkE4NfZ1JKXEkmk4PPA+0PaaHygoSvweGS8mFQxkdHE3lgSH4HSj//FYVvkaVy6/x8bkvvAoC9NLvdGITiv2zyIIWpfA6AvN2ALTvvwgtwEmoAAEtI3v/pPkWYC8AP35b+AUNEdakSGpIjAAAAAElFTkSuQmCC'
			,'style','height:1em'),
			$('/img','src',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA1VBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAGbC72VB7ukDcW4J9GRBrXVOOaLB7IMAg4ZBxytD8m4EdSgEME5EUDYX+XRQ+KdDMDbfujNLuHHINv6kPyXDLiEA62oBcjdZ+joVvPDOdnRF+LhT+rVTeYoDCxpMHHiXe3jaOxkC3hUCWSoH8bdQOvaJ+jqR/Xza/aCCqBxCoaJPJJWKF3Ocd7ARtHQW9zpg/D6evu3Tr6fJLSdRKnGbdZvqMl+AAAAR3RSTlMAGfbvWHCtDuVBndEihMe+LP///////////////////////////////////////////////////////////////////////3HKyNYAAAIGSURBVDjLdZNbU9swEIWPLEvyJdhALs1ASyCUh9L2//+TTh860JmUNhBDEmM7lqxLH6A0zmXftPPN2bOrXYpWkCCCaWVo6yXixBLVSnlt3Lv84rP9CiwaZe+OF0TvUQjNQYIf5MwTuwHhhue/gNmAU7EToOGnGUajqhkJussDi0YLmOQ2Uu6o0HYL8G2/bpJygUZgyfNAbwCH8uuJR7R471FmO0O5Mm1AmP5pDjZNnpI7wWR5UUjfrJt04ee5JhMAwMMcyZ/LmK8rsM7otwzuupzYamipflgdnGQvRikAhE1fAn5uGbWArstEPFQ8T+tXgNB+mgf9Oh5EYTdPbRBQHi+vZOWZFw/s6DpD96bwSxJOPpBOrAtdn38fcw6AAEgjnSA/YiXirEsrkCU4lGdZpl5KqObi1FuA+stSyNporZxpxvOT20D966KObsadaRiWxofzqh6r0/vzn6p+LQHweHyLlGMWW1KHYZZCD25k9X8OvlNXj7qIVRBJjhyySTPVGLwpoKOPrTXoZQSOGode8STd+qgLsuK6SzNmHTNIe+GUuPZvaoPLO89Zwqxzvpk1anMfrC2uZ8wyND0yuNf19kb5rvr46DcO7HQildkGjKikJYY4k88rvWtpCz0NrAcEbwY370LT5zOBi2e6Wr/W1p1F4hrfSiL3AkLEyLXE/uhQetjO/AVlIO7IIV5VegAAAABJRU5ErkJggg=='
			,'style','height:1em'),
			$('/img','src',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAk1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAABiAEBgAEJzgAEMgMElAMCcgIMnAsi7hsJqQUsyyhD7ToauxYKtAcMowo93jYf0Bgx5CkNygQGQwQBHQE8+zYLwAUl2R8KYggx9ylO90YBTgAbrRlT6kkRjg8UfBFf9lYouCQucthNAAAAMXRSTlMA5IYV8SULb0rPN1ilmr7/////////////////////////////////////////////FKL36QAAAcNJREFUOMuVk1tP20AQRs+u15fYcUKAcpWq/v8fVYmXCkFC7ATH672M+1AQSUip+r2stHv2aKSZgX8kITXxb48ZuVIzBZsi2fFBJsFDGfEVbNQ0ucmH5dny+PdlM9/eDo9OpeG8NlsAjMYDF00AFqwXsmqVonTf+yuXdUCFoy0NgZTWLJ4mq8EqyIv7NqmfgRT4hucZgZLJox1QgK6zycy9BEAx/inhXm3OHuIrGMC4y3J0VbaCOdAyx63Pd6lzgAacevilnOoBjAFaY2ivlmMEEgCfalObWGfDWHSkMxWmrtvIjneAmFrrJObqop9PljpMe6sakQ+AaAs3CYNsd3PXaZREPzp4qwGIWbiuVSrcdZgwG7YzN7436+00k6fUuPAatlIN8fqnsYdAVOsfM2UFLaqI0piOQ4AwzR9N1TEy1U6aMB4DJC83XYmDJIofPZ8AX9lE6ShF5qUZx88AY194KeSs3xfsA5JrM0ehnJWPKdR7QyRdvRaR16AdpwxIZcmF2MSRkwZidxvOu5BFThvwedlbsX5PcGhAlnIdhoM9OQSS7k665Giz9qNM/pz0XwBRokR/cGWOt3Fj+MKAjrnl//IbkRHoP9LhUvwAAAAASUVORK5CYII='
			,'style','height:1em'),
			$('/img','src',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABDlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9+vT+/PkEAwT///z38eb59Or6+PLw6t3YyKji07fz7N/f0r379+7p4M8YFRE6NjTu59jt5NINDAzm173azK/cyJ/l2cP48N/x7ubm28plX10eHB3i2Mfo3MYuKy3o4NS9trDWyLaJfWjMtpmcjXW/tJ15blmmlnxGQTtPSkRuZ2aFfn2dl43It47ZwJFbVljz58qQjaAiHxR6dXra08TOysaZk4jSwpisoI8rKCG5rZqHd1qRhHDDqoXHxL5bTzhpXT/ZwXrY1dPg0a4+yjH7AAAAWnRSTlMAgkim+NoF8WMMO4/jGbNa6m54KMz///////////////////////////////////////////////////////////////////////////////////////////+rd7B9AAACyklEQVQ4y2WTzXMbRRDF33zup+SVZKksR4KYQOIkkIouyf9f3HIILqiiSAUC+bBsLEsraVe7szM7MzlYxAbeqbvrV+/Q3Y/gVjKgLAe6rtG3Q/KlimRJkxpAtIuIK/4LRJGOJofcAdA5+VTvwvpfAGWDH+THlQEFYI/Cg1+W1gEAGABIx05enOUlHAXgUK7zmd1EvN07RHp4ujsnBJpQwMED0g/u/bSQ9Y2DHc02qHjruYX38JIx2cbFV5UxAANielL5tsMy4j2lcT9VhAQyIdX0z9CAAe77YOnyMrtuOxBhk20jN6hpoVVwuPGWYSCy1q1ja6xQiJ1hSmqlaSrSq/Cy9Qyqcz9HOnoYj/pkJ7iv08g90E/tYrp8tHKGQSRRo56efVBrUYYFZ0YUT97at8ukFA6FZhDj2Mx+BBq1enw0b0XYr35XDaBeClNeO4Zhrzr6rQEAXJx/szHDP/ZLHjhTkYpC1afZ7fF86r7UA/AcFHR5tZntRy/bTkGe75sujtcBGGJ1fMWEiLXHxOQF+NBvwfrxzLzBuTUE6AX3i2KKIMaiLb69XqbhsEIzfI3Jq+4KHGiKx1V7obVItfxuXjx6Y+eNEOe+F2INMMTx6cfKaipGO6rid43gDcJWt61S2TY0DDTJymBoU3PAysH7bvj39FIGPutyxJ1kZRnCanQ6p6JEuD5K+kn6sJEtV41q6YH71XkCUPZgzHDhtoSjAsDTANtnqLs/X1YODPBJucnoZd1aNIQQOFvVvQ+d9mwtq5uP0pT8haTwwhB4MGrD3m7QvKZ6C4ACQJ3zFCKREjxJKJInhTr5FOc1/gEAxgo3nkkcjycUCCcdnq33gbgJXb3R0s0BDQM080P9ytK7ADCG5LwBKGLnsYhw3JN3gYDAloL4exyVkBHvJHER3CYLzNFewBfZFNv86z6WNKvZ+6S+k82DBv8TqQHgM9aiVcpUk+SJAAAAAElFTkSuQmCC'
			,'style','height:1em'),
			$('/img','src',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA1VBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAgKdBQORBQKHBAIYBQSmBQOvBgT9cVHzdFApAQH4fFj1Vjz0YkX+TDY/DAjcaEfkbEm4BQR7AgEqEgvpelXra0tfLR3+Wz/+Y0k1CAXXWj9eBALuQCz8QjDBAwLQXEFwCgdSIBbRPCXiUjjMCgblIRf8imHCUDRKBAHCMCF8LyKqMSDqXUKfSDDcRzHui2PLaUlMCAbSpfikAAAAR3RSTlMA6l7iMhQL+EED17rwjG0gobBVyXj//////////////////////////////////////////////////////////////////yH81ooAAAKBSURBVDjLbZNbb9NAEIXP3hzHdpLiNg1taUOhhRYJeOf//wmQEC29UeViO3Zs752H9OIi5mWl2U+7M+fMAJvgAf4fbHMMXURMNx8GfdkB6GC8NK5zLwYx5dQ8AlSciWRN7DMQi1MmPTUABZCKE1m8Np0vUvWpkLs90QcYkK4/WhfU6WIoHwvwn+8C2UTWSzBQ+2bZjFZiaMxDnVwfVoNsf24GmQ8ZMFbMVztlcTZ3sAC4/zBi2ZsL4nVkDUOo+Yelrz/t/DhfukiCB+8OLif8xvn9Ym4sAQITxgd3GEwu386/J73F5/F9KUqQ4D6gBRhgPdjdl7k0Jz+nR1Sf4Zah9NOsgK8edHBE/d62sjm4MvXHW1azFfavdKuehILxPP+2aBLfULAyyTiKVm+aJk/arF8xfTSjRA1sRVzbNi/MAtDf3y3LbWJ8q6fBL1HhH8BgrqY2H+5FZpvf29VjnnYsPJFmEtZ/1KJ9bQX+fWHkD6hep5d5aKlMCzDzEhD9eK/NT2e7pIwUI+EML4Eg6Z3eNv3rUBZeRkqO2ZK5DiASfn5lBjmR0nEvXzXNOF5sCAYAIU/OL0yYg5xmvVjTtq/q3a0/4YOSInWH72YyychReanNbNtCR6rZEc3QWDAMVfR1OZvYOR/dVbIl0Sp2pE5UtTWoA08ZRHp45Zgt3GippYZp3GrLU9O3Yn1MsoiiLhvCogJYmVoBgCE3jMQkmLh2wVsGb4oT7XW8dSHqTc+ul484hsvjn6ZWBEDI0/bwJiPtk+jcfu2ra6pWGgyAcfl7Jp19Xgw3rMvcV7V+nKiwULe9quObd4lXrX6eKGeTvLu71ktUuuOFI/bFcsMxqQEAfwFtK1zn5pIZQAAAAABJRU5ErkJggg=='
			,'style','height:1em'),
			$('/img','src',
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAzFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgMAu/8An/8Apv8Aav8Aw/8Azv8Ak/8Ag/8AeP8Ab/8Aff8Ar/8AmP8Ajf8Ac/8AR/8AZP8AVP8AiP8Atf8AXv8AKl0A2f8AtPQAFR4AK0gAITMAhKMArO4AZHgAjqsAlsAAeokAeOcAgLsAN/8AdK4ASaEAf9EAmtMAkO0AmucAP1gAjuYASGMAbpoAUKsAjdsAMHoAXrIAYbCrIjaSAAAARHRSTlMAzPPlHLLaDAabNFECeWmF/////////////////////////////////////////////////////////////////////+Ht/HIAAAJFSURBVDjLhZNNb9xGDIYfznBGs5LWsRwXgU8F0kv//78JULTooQ2CZL22d2VJ89mDd91jeCQfvgRfgvCTEPbnoJUNsMX+Xyh0ZhW7CPLhga/v+Re44YUbgAdpfySlp/v79zVji6sUV7AUKhZZf9yHpOSl6p9+JJMdkhMA3z4J6fD5S0VBc1iHR1r+mIE1cAA9CNiBDcsu3//y1EB25SQ5L6v4LOqyb2b3lxbDWWGcofMptFJCKG2apAxFeBJQoHYrknQbD5dVXmFozTysVVDwUCmE59ldgKQ5RG9AVwxUNtPo7R3TNAHTNNzpypyAEQX5elOwvODf+o/IuT8HAM4oAEOsuUvx2CCD+tpQWr9pwkAmJzxzJZlajBkr5dzAAKAQvdkkjU/OSTR3HGM/Iz3YWrlifsfclkVCfXyUMbmhxUSDd4Dg7NAac+tMl+nEdRG+mCtQgerd6LxzfZxNpIt75quCh5no6RxxaNLfRClRVNi9jyhy8Kwx4TGA91V8ubhqQAk7hXWM1Jdm7SKaNdGElsGAPDwFZnO7dTPulI+G15Jg2DHlgIFovh2A8mm2wrB5GD8HiDPmzSiAPNnyuAfoOOF/OKmi4dk0DGFtMNRUa3uLcRRSu89w28BizW/f8br5V9PO21bzupUQTXaptW2rChjc0lhMlg/oEZEb+mO2zPf4rJQq2i09+QQR7yFmZeLoUkARev+rjizDP9fr5otFt/vD9u+z4AYATlgSCmQHFNgD2yL0rpXNglwErgqN0pny+rPv5z/XYiZzcMgFcgAAAABJRU5ErkJggg=='
			,'style','height:1em')
			)



		)
	)


og.width=mk.width=im.width
og.height=mk.height=im.height
og.style.marginRight = '-'+im.width+'px'
og.getContext('2d').drawImage(im,0,0)
og.style.display=mk.style.display=''

//var po
$(tp).$0(
	'style','position:relative;marginTop:-'+im.height+'px;cursor:crosshair',
	'onmousemove',function(e){
		//if(po)
		//	return
		if(e.buttons&1){
			var p = croquis.getRelativePosition(e.clientX, e.clientY)
			if(fn==4){
				console.log(111)
				if(cpstimg){
					var x=p.x,y=p.y,w= x-cpstimg._ox, h=y-cpstimg._oy, l = Math.sqrt(w*w+h*h), s=l/cpstimg._ol, r =-Math.atan(w/h)*180/Math.PI
					//console.log(s+' '+r)
					cpstimg._ns = s
					cpstimg._nr = r
					cpstimg.style.transform = 'translate(-50%,-50%) scale('+cpstimg._ns+') rotate('+cpstimg._nr+'deg)'
					console.log('r2')
					}
				return 
				}
			croquis.move(p.x, p.y);
			}
		},
	'onmousedown',function(e){
		//if(po)
		//	return
		if(e.buttons&1){
			var p = croquis.getRelativePosition(e.clientX, e.clientY)
			if(fn==4){
				var x=p.x,y=p.y
				cpstimg = $('/img','src',pstimg.src,'style','userDrag:none;webkitUserDrag:none;mozUserDrag:none;msUserDrag:none;userSelect:none;position:absolute;left:'+x+'px;top:'+y+'px;transform: translate(-50%,-50%) scale(1) rotate(0deg)')
				tp.appendChild(cpstimg)
				cpstimg._ox = x
				cpstimg._oy = y
				cpstimg._oh = cpstimg.height
				cpstimg._ow = cpstimg.width
				cpstimg._ol = cpstimg._oh > cpstimg._ow ? cpstimg._oh : cpstimg._ow
				console.log('r1')
				return
				}
			croquis.down(p.x, p.y);
			}
		},
	'onmouseup',function(e){
		//if(po)
		//	return
		if(fn==4){
			cpstimg=null
			console.log('r3')
			return;
			}
		var p = croquis.getRelativePosition(e.clientX, e.clientY)
		croquis.up(p.x, p.y);
		}/*,
	'onpointermove',function(e){
		if(po){
			po.push(e.pressure)
			if(po.length>40)
				po=po.slice(20)
			var p = croquis.getRelativePosition(e.clientX, e.clientY)

			if(e.pressure>0){
				if(po[po.length-2]==0 && po[po.length-3]==0 && po[po.length-4]==0){
					console.log('down '+e.pressure)
					croquis.down(p.x, p.y, e.pressure);
					}
				else{
					croquis.move(p.x, p.y);
					console.log(e.pressure)
					}
				}
			else if(e.pressure==0 && po[po.length-2]>0 && po[po.length-3]>0 && po[po.length-4]>0){
				console.log('up '+e.pressure)
				croquis.up(p.x, p.y, e.pressure);
				}
			}
		}*/
	)
	
	
	
	
	
	
this.imageEditorW._.show()

//var tpx = tp.getContext('2d')




}//fe

if(!commonui.textInputer)
commonui.textInputer = function(e,h,f){
	var x
	if(!this.textInputer.ui)
		this.textInputer.ui = this.createCommmonWindow()
	var y = this.textInputer.ui
	y._.addContent(null)
	y._.addTitle(h)
	y._.addContent(
		x = _$('/textarea'),
		_$('/button','innerHTML','确定','onclick',function(){
			f(x.value)
			y._.hide()
			})
		)
	y._.show(e)
	x.focus()
	}//


//===============================================================
//https://github.com/disjukr/croquis.js/blob/master/croquis.js
//Distributed under BSD license
//===============================================================
function Croquis(imageDataList, properties) {
    var self = this;
    if (properties != null)
        for (var property in properties)
            self[property] = properties[property];
    var domElement = document.createElement('div');
    domElement.style.clear = 'both';
    domElement.style.setProperty('user-select', 'none');
    domElement.style.setProperty('-webkit-user-select', 'none');
    domElement.style.setProperty('-ms-user-select', 'none');
    domElement.style.setProperty('-moz-user-select', 'none');
    self.getDOMElement = function () {
        return domElement;
    };
    self.getRelativePosition = function (absoluteX, absoluteY) {
        var rect = domElement.getBoundingClientRect();
        return {x: absoluteX - rect.left,y: absoluteY - rect.top};
    };
    var eventListeners = {
        'ondown': [],
        'onmove': [],
        'onup': [],
        'ontick': [],
        'onchange': [],
        'onundo': [],
        'onredo': [],
        'ontool': [],
        'oncanvassize': [],
        'onlayeradd': [],
        'onlayerremove': [],
        'onlayerswap': [],
        'onlayerselect': []
    };
    function dispatchEvent(event, e) {
        event = event.toLowerCase();
        e = e || {};
        if (eventListeners.hasOwnProperty(event)) {
            eventListeners[event].forEach(function (listener) {
                listener.call(self, e);
            });
        }
        else throw 'don\'t support ' + event;
    }
    self.addEventListener = function (event, listener) {
        event = event.toLowerCase();
        if (eventListeners.hasOwnProperty(event)) {
            if (typeof listener !== 'function')
                throw listener + ' is not a function';
            eventListeners[event].push(listener);
        }
        else throw 'don\'t support ' + event;
    };
    self.removeEventListener = function (event, listener) {
        event = event.toLowerCase();
        if (eventListeners.hasOwnProperty(event)) {
            if (listener == null) { // remove all
                eventListeners[event] = [];
                return;
            }
            var listeners = eventListeners[event];
            var index = listeners.indexOf(listener);
            if (index >= 0) listeners.splice(index, 1);
        }
        else throw 'don\'t support ' + event;
    };
    self.hasEventListener = function (event, listener) {
        event = event.toLowerCase();
        if (eventListeners.hasOwnProperty(event)) {
            if (listener == null)
                return eventListeners[event].length > 0;
            return eventListeners[event].indexOf(listener) >= 0;
        }
        else return false;
    };
    var undoStack = [];
    var redoStack = [];
    var undoLimit = 10;
    var preventPushUndo = false;
    var pushToTransaction = false;
    self.getUndoLimit = function () {
        return undoLimit;
    };
    self.setUndoLimit = function (limit) {
        undoLimit = limit;
    };
    self.lockHistory = function () {
        preventPushUndo = true;
    };
    self.unlockHistory = function () {
        preventPushUndo = false;
    };
    self.beginHistoryTransaction = function () {
        undoStack.push([]);
        pushToTransaction = true;
    };
    self.endHistoryTransaction = function () {
        pushToTransaction = false;
    };
    self.clearHistory = function () {
        if (preventPushUndo)
            throw 'history is locked';
        undoStack = [];
        redoStack = [];
    };
    function pushUndo(undoFunction) {
        dispatchEvent('onchange');
        if (self.onChanged)
            self.onChanged();
        if (preventPushUndo)
            return;
        redoStack = [];
        if (pushToTransaction)
            undoStack[undoStack.length - 1].push(undoFunction);
        else
            undoStack.push([undoFunction]);
        while (undoStack.length > undoLimit)
            undoStack.shift();
    }
    self.undo = function () {
        if (pushToTransaction)
            throw 'transaction is not ended';
        if (preventPushUndo)
            throw 'history is locked';
        if (isDrawing || isStabilizing)
            throw 'still drawing';
        if (undoStack.length == 0)
            throw 'no more undo data';
        var undoTransaction = undoStack.pop();
        var redoTransaction = [];
        while (undoTransaction.length)
            redoTransaction.push(undoTransaction.pop()());
        redoStack.push(redoTransaction);
        dispatchEvent('onundo');
    };
    self.redo = function () {
        if (pushToTransaction)
            throw 'transaction is not ended';
        if (preventPushUndo)
            throw 'history is locked';
        if (isDrawing || isStabilizing)
            throw 'still drawing';
        if (redoStack.length == 0)
            throw 'no more redo data';
        var redoTransaction = redoStack.pop();
        var undoTransaction = [];
        while (redoTransaction.length)
            undoTransaction.push(redoTransaction.pop()());
        undoStack.push(undoTransaction);
        dispatchEvent('onredo');
    };
    function pushLayerMetadataUndo(index) {
        index = index || layerIndex;
        var snapshotMetadata = self.getLayerMetadata(index);
        var swap = function () {
            self.lockHistory();
            var temp = self.getLayerMetadata(index);
            self.setLayerMetadata(snapshotMetadata, index);
            snapshotMetadata = temp;
            self.unlockHistory();
            return swap;
        };
        pushUndo(swap);
    }
    function pushLayerOpacityUndo(index) {
        index = index || layerIndex;
        var snapshotOpacity = self.getLayerOpacity(index);
        var swap = function () {
            self.lockHistory();
            var temp = self.getLayerOpacity(index);
            self.setLayerOpacity(snapshotOpacity, index);
            snapshotOpacity = temp;
            self.unlockHistory();
            return swap;
        };
        pushUndo(swap);
    }
    function pushLayerVisibleUndo(index) {
        index = index || layerIndex;
        var snapshotVisible = self.getLayerVisible(index);
        var swap = function () {
            self.lockHistory();
            var temp = self.getLayerVisible(index);
            self.setLayerVisible(snapshotVisible, index);
            snapshotVisible = temp;
            self.unlockHistory();
            return swap;
        };
        pushUndo(swap);
    }
    function pushSwapLayerUndo(layerA, layerB) {
        var swap = function () {
            self.lockHistory();
            self.swapLayer(layerA, layerB);
            self.unlockHistory();
            return swap;
        };
        pushUndo(swap);
    }
    function pushAddLayerUndo(index) {
        var add = function () {
            self.lockHistory();
            self.addLayer(index);
            self.unlockHistory();
            cacheLayer(index);
            return remove;
        };
        var remove = function () {
            self.lockHistory();
            self.removeLayer(index);
            self.unlockHistory();
            return add;
        };
        pushUndo(remove);
    }
    function pushRemoveLayerUndo(index) {
        var layerContext = getLayerContext(index);
        var w = size.width;
        var h = size.height;
        var snapshotData = layerContext.getImageData(0, 0, w, h);
        var snapshotMetadata = self.getLayerMetadata(index);
        var snapshotOpacity = self.getLayerOpacity(index);
        var snapshotVisible = self.getLayerVisible(index);
        var add = function () {
            self.lockHistory();
            self.addLayer(index);
            self.setLayerMetadata(snapshotMetadata, index);
            self.setLayerOpacity(snapshotOpacity, index);
            self.setLayerVisible(snapshotVisible, index);
            var layerContext = getLayerContext(index);
            layerContext.putImageData(snapshotData, 0, 0);
            self.unlockHistory();
            cacheLayer(index);
            return remove;
        };
        var remove = function () {
            self.lockHistory();
            self.removeLayer(index);
            self.unlockHistory();
            return add;
        };
        pushUndo(add);
    }
    function pushDirtyRectUndo(x, y, width, height, index) {
        index = index || layerIndex;
        var w = size.width;
        var h = size.height;
        var right = x + width;
        var bottom = y + height;
        x = Math.min(w, Math.max(0, x));
        y = Math.min(h, Math.max(0, y));
        width = Math.min(w, Math.max(x, right)) - x;
        height = Math.min(h, Math.max(y, bottom)) - y;
        if ((x % 1) > 0)
            ++width;
        if ((y % 1) > 0)
            ++height;
        x = x | 0;
        y = y | 0;
        width = Math.min(w - x, Math.ceil(width));
        height = Math.min(h - y, Math.ceil(height));
        if ((width === 0) || (height === 0)) {
            var doNothing = function () {
                return doNothing;
            };
            pushUndo(doNothing);
        }
        else {
            var layerContext = getLayerContext(index);
            var snapshotData = layerContext.getImageData(x, y, width, height);
            var swap = function () {
                var layerContext = getLayerContext(index);
                var tempData = layerContext.getImageData(x, y, width, height);
                layerContext.putImageData(snapshotData, x, y);
                snapshotData = tempData;
                cacheLayer(index);
                return swap;
            };
            pushUndo(swap);
        }
        if (renderDirtyRect)
            drawDirtyRect(x, y, width, height);
    }
    function pushContextUndo(index) {
        index = index || layerIndex;
        pushDirtyRectUndo(0, 0, size.width, size.height, index);
    }
    function pushAllContextUndo() {
        var snapshotDatas = [];
        var i;
        var w = size.width;
        var h = size.height;
        for (i = 0; i < layers.length; ++i) {
            var layerContext = getLayerContext(i);
            snapshotDatas.push(layerContext.getImageData(0, 0, w, h));
        }
        var swap = function (index) {
            var layerContext = getLayerContext(index);
            var tempData = layerContext.getImageData(0, 0, w, h);
            layerContext.putImageData(snapshotDatas[index], 0, 0);
            snapshotDatas[index] = tempData;
            cacheLayer(index);
        };
        var swapAll = function () {
            for (var i = 0; i < layers.length; ++i)
                swap(i);
            return swapAll;
        };
        pushUndo(swapAll);
    }
    function pushCanvasSizeUndo(width, height, offsetX, offsetY) {
        var snapshotSize = self.getCanvasSize();
        var snapshotDatas = [];
        var w = snapshotSize.width;
        var h = snapshotSize.height;
        for (var i = 0; i < layers.length; ++i) {
            var layerContext = getLayerContext(i);
            snapshotDatas[i] = layerContext.getImageData(0, 0, w, h);
        }
        function setSize(width, height, offsetX, offsetY) {
            self.lockHistory();
            self.setCanvasSize(width, height, offsetX, offsetY);
            self.unlockHistory();
        }
        var rollback = function () {
            setSize(w, h);
            for (var i = 0; i < layers.length; ++i) {
                var layerContext = getLayerContext(i);
                layerContext.putImageData(snapshotDatas[i], 0, 0);
            }
            return redo;
        };
        var redo = function () {
            rollback();
            setSize(width, height, offsetX, offsetY);
            return rollback;
        };
        pushUndo(rollback);
    }
    var size = {width: 640, height: 480};
    self.getCanvasSize = function () {
        return {width: size.width, height: size.height}; //clone size
    };
    self.setCanvasSize = function (width, height, offsetX, offsetY) {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        size.width = width = Math.floor(width);
        size.height = height = Math.floor(height);
        pushCanvasSizeUndo(width, height, offsetX, offsetY);
        dispatchEvent('oncanvassize', {
            width: width, height: height,
            offsetX: offsetX, offsetY: offsetY
        });
        paintingCanvas.width = width;
        paintingCanvas.height = height;
        dirtyRectDisplay.width = width;
        dirtyRectDisplay.height = height;
        domElement.style.width = width + 'px';
        domElement.style.height = height + 'px';
        for (var i=0; i<layers.length; ++i) {
            var canvas = getLayerCanvas(i);
            var context = getLayerContext(i);
            var imageData = context.getImageData(0, 0, width, height);
            canvas.width = width;
            canvas.height = height;
            context.putImageData(imageData, offsetX, offsetY);
        }
    };
    self.getCanvasWidth = function () {
        return size.width;
    };
    self.setCanvasWidth = function (width, offsetX) {
        self.setCanvasSize(width, size.height, offsetX, 0);
    };
    self.getCanvasHeight = function () {
        return size.height;
    };
    self.setCanvasHeight = function (height, offsetY) {
        self.setCanvasSize(size.width, height, 0, offsetY);
    };
    function getLayerCanvas(index) {
        return layers[index].getElementsByClassName('croquis-layer-canvas')[0];
    }
    self.getLayerCanvas = getLayerCanvas;
    function getLayerContext(index) {
        return getLayerCanvas(index).getContext('2d');
    }
    var layers = [];
    var layerIndex = 0;
    var paintingCanvas = document.createElement('canvas');
    var paintingContext = paintingCanvas.getContext('2d');
    paintingCanvas.className = 'croquis-painting-canvas';
    paintingCanvas.style.position = 'absolute';
    var dirtyRectDisplay = document.createElement('canvas');
    var dirtyRectDisplayContext = dirtyRectDisplay.getContext('2d');
    dirtyRectDisplay.className = 'croquis-dirty-rect-display';
    dirtyRectDisplay.style.position = 'absolute';
    var renderDirtyRect = false;
    function sortLayers() {
        while (domElement.firstChild)
            domElement.removeChild(domElement.firstChild);
        for (var i = 0; i < layers.length; ++i) {
            var layer = layers[i];
            domElement.appendChild(layer);
        }
        domElement.appendChild(dirtyRectDisplay);
    }
    function drawDirtyRect(x, y, w, h) {
        var context = dirtyRectDisplayContext;
        context.fillStyle = '#f00';
        context.globalCompositeOperation = 'source-over';
        context.fillRect(x, y, w, h);
        if ((w > 2) && (h > 2)) {
            context.globalCompositeOperation = 'destination-out';
            context.fillRect(x + 1, y + 1, w - 2, h - 2);
        }
    }
    self.getRenderDirtyRect = function () {
        return renderDirtyRect;
    };
    self.setRenderDirtyRect = function (render) {
        renderDirtyRect = render;
        if (render == false)
            dirtyRectDisplayContext.clearRect(0, 0, size.width, size.height);
    };
    self.createLayerThumbnail = function (index, width, height) {
        index = index || layerIndex;
        width = width || size.width;
        height = height || size.height;
        var canvas = getLayerCanvas(index);
        var thumbnail = document.createElement('canvas');
        var thumbnailContext = thumbnail.getContext('2d');
        thumbnail.width = width;
        thumbnail.height = height;
        thumbnailContext.drawImage(canvas, 0, 0, width, height);
        return thumbnail;
    };
    self.createFlattenThumbnail = function (width, height) {
        width = width || size.width;
        height = height || size.height;
        var thumbnail = document.createElement('canvas');
        var thumbnailContext = thumbnail.getContext('2d');
        thumbnail.width = width;
        thumbnail.height = height;
        for (var i = 0; i < layers.length; ++i) {
            if (!self.getLayerVisible(i))
                continue;
            var canvas = getLayerCanvas(i);
            thumbnailContext.globalAlpha = self.getLayerOpacity(i);
            thumbnailContext.drawImage(canvas, 0, 0, width, height);
        }
        return thumbnail;
    };
    self.getLayers = function () {
        return layers.concat(); //clone layers
    };
    self.getLayerCount = function () {
        return layers.length;
    };
    self.addLayer = function (index) {
        index = index || layers.length;
        pushAddLayerUndo(index);
        var layer = document.createElement('div');
        layer.className = 'croquis-layer';
        layer.style.visibility = 'visible';
        layer.style.opacity = 1;
        layer['croquis-metadata'] = {};
        var canvas = document.createElement('canvas');
        canvas.className = 'croquis-layer-canvas';
        canvas.width = size.width;
        canvas.height = size.height;
        canvas.style.position = 'absolute';
        layer.appendChild(canvas);
        domElement.appendChild(layer);
        layers.splice(index, 0, layer);
        sortLayers();
        self.selectLayer(layerIndex);
        dispatchEvent('onlayeradd', {index: index});
        if (self.onLayerAdded)
            self.onLayerAdded(index);
        return layer;
    };
    self.removeLayer = function (index) {
        index = index || layerIndex;
        pushRemoveLayerUndo(index);
        domElement.removeChild(layers[index]);
        layers.splice(index, 1);
        if (layerIndex == layers.length)
            self.selectLayer(layerIndex - 1);
        sortLayers();
        dispatchEvent('onlayerremove', {index: index});
        if (self.onLayerRemoved)
            self.onLayerRemoved(index);
    };
    self.removeAllLayer = function () {
        while (layers.length)
            self.removeLayer(0);
    };
    self.swapLayer = function (layerA, layerB) {
        pushSwapLayerUndo(layerA, layerB);
        var layer = layers[layerA];
        layers[layerA] = layers[layerB];
        layers[layerB] = layer;
        sortLayers();
        dispatchEvent('onlayerswap', {a: layerA, b: layerB});
        if (self.onLayerSwapped)
            self.onLayerSwapped(layerA, layerB);
    };
    self.getCurrentLayerIndex = function () {
        return layerIndex;
    };
    self.selectLayer = function (index) {
        var lastestLayerIndex = layers.length - 1;
        if (index > lastestLayerIndex)
            index = lastestLayerIndex;
        layerIndex = index;
        if (paintingCanvas.parentElement != null)
            paintingCanvas.parentElement.removeChild(paintingCanvas);
        layers[index].appendChild(paintingCanvas);
        dispatchEvent('onlayerselect', {index: index});
        if (self.onLayerSelected)
            self.onLayerSelected(index);
    };
    self.clearLayer = function (index) {
        index = index || layerIndex;
        pushContextUndo(index);
        var context = getLayerContext(index);
        context.clearRect(0, 0, size.width, size.height);
        cacheLayer(index);
    };
    self.fillLayer = function (fillColor, index) {
        index = index || layerIndex;
        pushContextUndo(index);
        var context = getLayerContext(index);
        context.fillStyle = fillColor;
        context.fillRect(0, 0, size.width, size.height);
        cacheLayer(index);
    };
    self.fillLayerRect = function (fillColor, x, y, width, height, index) {
        index = index || layerIndex;
        pushDirtyRectUndo(x, y, width, height, index);
        var context = getLayerContext(index);
        context.fillStyle = fillColor;
        context.fillRect(x, y, width, height);
        cacheLayer(index);
    };
    self.floodFill = function (x, y, r, g, b, a, index) {
        index = index || layerIndex;
        pushContextUndo(index);
        var context = getLayerContext(index);
        var w = size.width;
        var h = size.height;
        if ((x < 0) || (x >= w) || (y < 0) || (y >= h))
            return;
        var imageData = context.getImageData(0, 0, w, h);
        var d = imageData.data;
        var targetColor = getColor(x, y);
        var replacementColor = (r << 24) | (g << 16) | (b << 8) | a;
        if (targetColor === replacementColor)
            return;
        function getColor(x, y) {
            var index = ((y * w) + x) * 4;
            return ((d[index] << 24) | (d[index + 1] << 16) |
                (d[index + 2] << 8) | d[index + 3]);
        }
        function setColor(x, y) {
            var index = ((y * w) + x) * 4;
            d[index] = r;
            d[index + 1] = g;
            d[index + 2] = b;
            d[index + 3] = a;
        }
        var queue = [];
        queue.push(x, y);
        while (queue.length) {
            var nx = queue.shift();
            var ny = queue.shift();
            if ((nx < 0) || (nx >= w) || (ny < 0) || (ny >= h) ||
                (getColor(nx, ny) !== targetColor))
                continue;
            var west, east;
            west = east = nx;
            do {
                var wc = getColor(--west, ny);
            } while ((west >= 0) && (wc === targetColor));
            do {
                var ec = getColor(++east, ny);
            } while ((east < w) && (ec === targetColor));
            for (var i = west + 1; i < east; ++i) {
                setColor(i, ny);
                var north = ny - 1;
                var south = ny + 1;
                if (getColor(i, north) === targetColor)
                    queue.push(i, north);
                if (getColor(i, south) === targetColor)
                    queue.push(i, south);
            }
        }
        context.putImageData(imageData, 0, 0);
        cacheLayer(index);
    };
    self.getLayerMetadata = function (index) {
        index = index || layerIndex;
        var metadata = layers[index]['croquis-metadata'];
        var clone = {};
        Object.keys(metadata).forEach(function (key) {
            clone[key] = metadata[key];
        });
        return clone;
    };
    self.setLayerMetadata = function (metadata, index) {
        index = index || layerIndex;
        pushLayerMetadataUndo(index);
        layers[index]['croquis-metadata'] = metadata;
    };
    self.getLayerOpacity = function (index) {
        index = index || layerIndex;
        var opacity = parseFloat(
            layers[index].style.getPropertyValue('opacity'));
        return window.isNaN(opacity) ? 1 : opacity;
    };
    self.setLayerOpacity = function (opacity, index) {
        index = index || layerIndex;
        pushLayerOpacityUndo(index);
        layers[index].style.opacity = opacity;
    };
    self.getLayerVisible = function (index) {
        index = index || layerIndex;
        var visible = layers[index].style.getPropertyValue('visibility');
        return visible != 'hidden';
    };
    self.setLayerVisible = function (visible, index) {
        index = index || layerIndex;
        pushLayerVisibleUndo(index);
        layers[index].style.visibility = visible ? 'visible' : 'hidden';
    };
    function cacheLayer(index) {
        index = index || layerIndex;
        var w = size.width;
        var h = size.height;
        layers[index].cache = getLayerContext(index).getImageData(0, 0, w, h);
    }
    self.getLayerImageDataCache = function (index) {
        index = index || layerIndex;
        if (layers[index].cache == null)
            cacheLayer(index);
        return layers[index].cache;
    };
    function makeColorData(imageData1x1) {
        var data = imageData1x1.data;
        var r = data[0];
        var g = data[1];
        var b = data[2];
        var a = data[3];
        return {
            r: r, g: g, b: b, a: a,
            htmlColor: 'rgba(' + [r, g, b, a / 0xff].join(',') + ')'
        };
    }
    self.pickColor = function (x, y, index) {
        x = x | 0; // cast to int
        y = y | 0;
        if ((x < 0) || (x >= size.width) || (y < 0) || (y >= size.height))
            return null;
        index = index || layerIndex;
        var cache = self.getLayerImageDataCache(index);
        var position = (y * size.width + x) * 4;
        var data = [];
        data[0] = cache.data[position];
        data[1] = cache.data[++position];
        data[2] = cache.data[++position];
        data[3] = cache.data[++position];
        return makeColorData({data: data});
    };
    self.eyeDrop = function (x, y, baseColor) {
        if (self.pickColor(x, y) == null)
            return null;
        baseColor = baseColor || '#fff';
        var plane = document.createElement('canvas');
        plane.width = 1;
        plane.height = 1;
        var planeContext = plane.getContext('2d');
        planeContext.fillStyle = baseColor;
        planeContext.fillRect(0, 0, 1, 1);
        for (var i = 0; i < layers.length; ++i) {
            if (!self.getLayerVisible(i))
                continue;
            planeContext.globalAlpha = self.getLayerOpacity(i);
            planeContext.fillStyle = self.pickColor(x, y, i).htmlColor;
            planeContext.fillRect(0, 0, 1, 1);
        }
        return makeColorData(planeContext.getImageData(0, 0, 1, 1));
    };
    var tool;
    var toolStabilizeLevel = 0;
    var toolStabilizeWeight = 0.8;
    var stabilizer = null;
    var stabilizerInterval = 5;
    var tick;
    var tickInterval = 20;
    var paintingOpacity = 1;
    var paintingKnockout = false;
    self.getTool = function () {
        return tool;
    };
    self.setTool = function (value) {
        tool = value;
        dispatchEvent('ontool', {tool: value});
        paintingContext = paintingCanvas.getContext('2d');
        if (tool && tool.setContext)
            tool.setContext(paintingContext);
    };
    self.setTool(new Croquis.Brush());
    self.getPaintingOpacity = function () {
        return paintingOpacity;
    };
    self.setPaintingOpacity = function (opacity) {
        paintingOpacity = opacity;
        paintingCanvas.style.opacity = opacity;
    };
    self.getPaintingKnockout = function () {
        return paintingKnockout;
    };
    self.setPaintingKnockout = function (knockout) {
        if (isDrawing || isStabilizing)
            throw 'still drawing';
        paintingKnockout = knockout;
        paintingCanvas.style.visibility = knockout ? 'hidden' : 'visible';
    };
    self.getTickInterval = function () {
        return tickInterval;
    };
    self.setTickInterval = function (interval) {
        tickInterval = interval;
    };
    /*
    stabilize level is the number of coordinate tracker.
    higher stabilize level makes lines smoother.
    */
    self.getToolStabilizeLevel = function () {
        return toolStabilizeLevel;
    };
    self.setToolStabilizeLevel = function (level) {
        toolStabilizeLevel = (level < 0) ? 0 : level;
    };
    /*
    higher stabilize weight makes trackers follow slower.
    */
    self.getToolStabilizeWeight = function () {
        return toolStabilizeWeight;
    };
    self.setToolStabilizeWeight = function (weight) {
        toolStabilizeWeight = weight;
    };
    self.getToolStabilizeInterval = function () {
        return stabilizerInterval;
    };
    self.setToolStabilizeInterval = function (interval) {
        stabilizerInterval = interval;
    };
    var isDrawing = false;
    var isStabilizing = false;
    var beforeKnockout = document.createElement('canvas');
    var knockoutTick;
    var knockoutTickInterval = 20;
    function gotoBeforeKnockout() {
        var context = getLayerContext(layerIndex);
        var w = size.width;
        var h = size.height;
        context.clearRect(0, 0, w, h);
        context.drawImage(beforeKnockout, 0, 0, w, h);
    }
    function drawPaintingCanvas() { //draw painting canvas on current layer
        var context = getLayerContext(layerIndex);
        var w = size.width;
        var h = size.height;
        context.save();
        context.globalAlpha = paintingOpacity;
        context.globalCompositeOperation = paintingKnockout ?
            'destination-out' : 'source-over';
        context.drawImage(paintingCanvas, 0, 0, w, h);
        context.restore();
    }
    function _move(x, y, pressure) {
        if (tool.move)
            tool.move(x, y, pressure);
        dispatchEvent('onmove', {x: x, y: y, pressure: pressure});
        if (self.onMoved)
            self.onMoved(x, y, pressure);
    }
    function _up(x, y, pressure) {
        isDrawing = false;
        isStabilizing = false;
        var dirtyRect;
        if (tool.up)
            dirtyRect = tool.up(x, y, pressure);
        if (paintingKnockout)
            gotoBeforeKnockout();
        if (dirtyRect)
            pushDirtyRectUndo(dirtyRect.x, dirtyRect.y,
                              dirtyRect.width, dirtyRect.height);
        else
            pushContextUndo();
        drawPaintingCanvas();
        paintingContext.clearRect(0, 0, size.width, size.height);
        dirtyRect = dirtyRect ||
            {x: 0, y: 0, width: size.width, height: size.height};
        dispatchEvent('onup',
            {x: x, y: y, pressure: pressure, dirtyRect: dirtyRect});
        if (self.onUpped)
            self.onUpped(x, y, pressure, dirtyRect);
        window.clearInterval(knockoutTick);
        window.clearInterval(tick);
        cacheLayer(self.getCurrentLayerIndex());
    }
    self.down = function (x, y, pressure) {
        if (isDrawing || isStabilizing)
            throw 'still drawing';
        isDrawing = true;
        if (tool == null)
            return;
        if (paintingKnockout) {
            var w = size.width;
            var h = size.height;
            var canvas = getLayerCanvas(layerIndex);
            var beforeKnockoutContext = beforeKnockout.getContext('2d');
            beforeKnockout.width = w;
            beforeKnockout.height = h;
            beforeKnockoutContext.clearRect(0, 0, w, h);
            beforeKnockoutContext.drawImage(canvas, 0, 0, w, h);
        }
        pressure = pressure || Croquis.Tablet.pressure();
        var down = tool.down;
        if (toolStabilizeLevel > 0) {
            stabilizer = new Croquis.Stabilizer(down, _move, _up,
                toolStabilizeLevel, toolStabilizeWeight,
                x, y, pressure, stabilizerInterval);
            isStabilizing = true;
        }
        else if (down != null)
            down(x, y, pressure);
        dispatchEvent('ondown', {x: x, y: y, pressure: pressure});
        if (self.onDowned)
            self.onDowned(x, y, pressure);
        knockoutTick = window.setInterval(function () {
            if (paintingKnockout) {
                gotoBeforeKnockout();
                drawPaintingCanvas();
            }
        }, knockoutTickInterval);
        tick = window.setInterval(function () {
            if (tool.tick)
                tool.tick();
            dispatchEvent('ontick');
            if (self.onTicked)
                self.onTicked();
        }, tickInterval);
    };
    self.move = function (x, y, pressure) {
        if (!isDrawing)
            throw 'you need to call \'down\' first';
        if (tool == null)
            return;
        pressure = pressure || Croquis.Tablet.pressure();
        if (stabilizer != null)
            stabilizer.move(x, y, pressure);
        else if (!isStabilizing)
            _move(x, y, pressure);
    };
    self.up = function (x, y, pressure) {
        if (!isDrawing)
            throw 'you need to call \'down\' first';
        if (tool == null) {
            isDrawing = false;
            return;
        }
        pressure = pressure || Croquis.Tablet.pressure();
        if (stabilizer != null)
            stabilizer.up(x, y, pressure);
        else
            _up(x, y, pressure);
        stabilizer = null;
    };
    // apply image data
    ;(function (croquis, imageDataList) {
        if (imageDataList != null) {
            if (imageDataList.length === 0)
                return;
            croquis.lockHistory();
            var first = imageDataList[0];
            croquis.setCanvasSize(first.width, first.height);
            for (var i = 0; i < imageDataList.length; ++i) {
                var current = imageDataList[i];
                if ((current.width != first.width) ||
                    (current.height != first.height))
                    throw 'all image data must have same size';
                croquis.addLayer();
                var context = croquis.getLayerCanvas(i).getContext('2d');
                context.putImageData(current, 0, 0);
            }
            croquis.selectLayer(0);
            croquis.unlockHistory();
        }
    }).call(null, self, imageDataList);
}
Croquis.createChecker = function (cellSize, colorA, colorB) {
    cellSize = cellSize || 10;
    colorA = colorA || '#fff';
    colorB = colorB || '#ccc';
    var size = cellSize + cellSize;
    var checker = document.createElement('canvas');
    checker.width = checker.height = size;
    var context = checker.getContext('2d');
    context.fillStyle = colorB;
    context.fillRect(0, 0, size, size);
    context.fillStyle = colorA;
    context.fillRect(0, 0, cellSize, cellSize);
    context.fillRect(cellSize, cellSize, size, size);
    return checker;
};
Croquis.createBrushPointer = function (brushImage, brushSize, brushAngle,
                                       threshold, antialias, color,
                                       shadow, shadowOffsetX, shadowOffsetY) {
    brushSize = brushSize | 0;
    var pointer = document.createElement('canvas');
    var pointerContext = pointer.getContext('2d');
    var boundWidth;
    var boundHeight;
    if (brushSize === 0) {
        pointer.width = boundWidth = 1;
        pointer.height = boundHeight = 1;
    }
    if (brushImage == null) {
        var halfSize = (brushSize * 0.5) | 0;
        pointer.width = boundWidth = brushSize;
        pointer.height = boundHeight = brushSize;
        pointerContext.fillStyle = '#000';
        pointerContext.beginPath();
        pointerContext.arc(halfSize, halfSize, halfSize, 0, Math.PI * 2);
        pointerContext.closePath();
        pointerContext.fill();
    }
    else {
        var width = brushSize;
        var height = brushSize * (brushImage.height / brushImage.width);
        var toRad = Math.PI / 180;
        var ra = brushAngle * toRad;
        var abs = Math.abs;
        var sin = Math.sin;
        var cos = Math.cos;
        boundWidth = abs(height * sin(ra)) + abs(width * cos(ra));
        boundHeight = abs(width * sin(ra)) + abs(height * cos(ra));
        pointer.width = boundWidth;
        pointer.height = boundHeight;
        pointerContext.save();
        pointerContext.translate(boundWidth * 0.5, boundHeight * 0.5);
        pointerContext.rotate(ra);
        pointerContext.translate(width * -0.5, height * -0.5);
        pointerContext.drawImage(brushImage, 0, 0, width, height);
        pointerContext.restore();
    }
    var result;
    var alphaThresholdBorder = Croquis.createAlphaThresholdBorder(
        pointer, threshold, antialias, color);
    if (shadow) {
        shadowOffsetX = shadowOffsetX || 1;
        shadowOffsetY = shadowOffsetY || 1;
        result = document.createElement('canvas');
        result.width = boundWidth + shadowOffsetX;
        result.height = boundHeight + shadowOffsetY;
        var resultContext = result.getContext('2d');
        resultContext.shadowOffsetX = shadowOffsetX;
        resultContext.shadowOffsetY = shadowOffsetY;
        resultContext.shadowColor = shadow;
        resultContext.drawImage(
            alphaThresholdBorder, 0, 0, boundWidth, boundHeight);
    }
    else {
        result = alphaThresholdBorder;
    }
    return result;
};
Croquis.createAlphaThresholdBorder = function (image, threshold,
                                               antialias, color) {
    threshold = threshold || 0x80;
    color = color || '#000';
    var width = image.width;
    var height = image.height;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    try {
        context.drawImage(image, 0, 0, width, height);
    }
    catch (e) {
        return canvas;
    }
    var imageData = context.getImageData(0, 0, width, height);
    var d = imageData.data;
    function getAlphaIndex(index) {
        return d[index * 4 + 3];
    }
    function setRedIndex(index, red) {
        d[index * 4] = red;
    }
    function getRedXY(x, y) {
        var red = d[((y * width) + x) * 4];
        return red || 0;
    }
    function getGreenXY(x, y) {
        var green = d[((y * width) + x) * 4 + 1];
        return green;
    }
    function setColorXY(x, y, red, green, alpha) {
        var i = ((y * width) + x) * 4;
        d[i] = red;
        d[i + 1] = green;
        d[i + 2] = 0;
        d[i + 3] = alpha;
    }
    //threshold
    var pixelCount = (d.length * 0.25) | 0;
    for (var i = 0; i < pixelCount; ++i)
        setRedIndex(i, (getAlphaIndex(i) < threshold) ? 0 : 1);
    //outline
    var x;
    var y;
    for (x = 0; x < width; ++x) {
        for (y = 0; y < height; ++y) {
            if (!getRedXY(x, y)) {
                setColorXY(x, y, 0, 0, 0);
            }
            else {
                var redCount = 0;
                var left = x - 1;
                var right = x + 1;
                var up = y - 1;
                var down = y + 1;
                redCount += getRedXY(left, up);
                redCount += getRedXY(left, y);
                redCount += getRedXY(left, down);
                redCount += getRedXY(right, up);
                redCount += getRedXY(right, y);
                redCount += getRedXY(right, down);
                redCount += getRedXY(x, up);
                redCount += getRedXY(x, down);
                if (redCount != 8)
                    setColorXY(x, y, 1, 1, 255);
                else
                    setColorXY(x, y, 1, 0, 0);
            }
        }
    }
    //antialias
    if (antialias) {
        for (x = 0; x < width; ++x) {
            for (y = 0; y < height; ++y) {
                if (getGreenXY(x, y)) {
                    var alpha = 0;
                    if (getGreenXY(x - 1, y) != getGreenXY(x + 1, y))
                        setColorXY(x, y, 1, 1, alpha += 0x40);
                    if (getGreenXY(x, y - 1) != getGreenXY(x, y + 1))
                        setColorXY(x, y, 1, 1, alpha + 0x50);
                }
            }
        }
    }
    context.putImageData(imageData, 0, 0);
    context.globalCompositeOperation = 'source-in';
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
    return canvas;
};
Croquis.createFloodFill = function (canvas, x, y, r, g, b, a) {
    var result = document.createElement('canvas');
    var w = result.width = canvas.width;
    var h = result.height = canvas.height;
    if ((x < 0) || (x >= w) || (y < 0) || (y >= h) || !(r || g || b || a))
        return result;
    var originalContext = canvas.getContext('2d');
    var originalData = originalContext.getImageData(0, 0, w, h);
    var od = originalData.data;
    var resultContext = result.getContext('2d');
    var resultData = resultContext.getImageData(0, 0, w, h);
    var rd = resultData.data;
    var targetColor = getColor(x, y);
    var replacementColor = (r << 24) | (g << 16) | (b << 8) | a;
    function getColor(x, y) {
        var index = ((y * w) + x) * 4;
        return (rd[index] ? replacementColor :
            ((od[index] << 24) | (od[index + 1] << 16) |
             (od[index + 2] << 8) | od[index + 3]));
    }
    var queue = [];
    queue.push(x, y);
    while (queue.length) {
        var nx = queue.shift();
        var ny = queue.shift();
        if ((nx < 0) || (nx >= w) || (ny < 0) || (ny >= h) ||
            (getColor(nx, ny) !== targetColor))
            continue;
        var west, east;
        west = east = nx;
        do {
            var wc = getColor(--west, ny);
        } while ((west >= 0) && (wc === targetColor));
        do {
            var ec = getColor(++east, ny);
        } while ((east < w) && (ec === targetColor));
        for (var i = west + 1; i < east; ++i) {
            rd[((ny * w) + i) * 4] = 1;
            var north = ny - 1;
            var south = ny + 1;
            if (getColor(i, north) === targetColor)
                queue.push(i, north);
            if (getColor(i, south) === targetColor)
                queue.push(i, south);
        }
    }
    for (var i = 0; i < w; ++i) {
        for (var j = 0; j < h; ++j) {
            var index = ((j * w) + i) * 4;
            if (rd[index] === 0)
                continue;
            rd[index] = r;
            rd[index + 1] = g;
            rd[index + 2] = b;
            rd[index + 3] = a;
        }
    }
    resultContext.putImageData(resultData, 0, 0);
    return result;
};

Croquis.Tablet = {};
Croquis.Tablet.plugin = function () {
    var plugin = document.querySelector(
        'object[type=\'application/x-wacomtabletplugin\']');
    if (!plugin) {
        plugin = document.createElement('object');
        plugin.type = 'application/x-wacomtabletplugin';
        plugin.style.position = 'absolute';
        plugin.style.top = '-1000px';
        document.body.appendChild(plugin);
    }
    return plugin;
};
Croquis.Tablet.pen = function () {
    var plugin = Croquis.Tablet.plugin();
    return plugin.penAPI;
};
Croquis.Tablet.pressure = function () {
    var pen = Croquis.Tablet.pen();
    return (pen && pen.pointerType) ? pen.pressure : 1;
};
Croquis.Tablet.isEraser = function () {
    var pen = Croquis.Tablet.pen();
    return pen ? pen.isEraser : false;
};

Croquis.StabilizerLog=[]
Croquis.Stabilizer = function (down, move, up, level, weight,
                               x, y, pressure, interval) {
    interval = interval || 5;
    var follow = 1 - Math.min(0.95, Math.max(0, weight));
    var paramTable = [];
    var current = { x: x, y: y, pressure: pressure };
    for (var i = 0; i < level; ++i)
        paramTable.push({ x: x, y: y, pressure: pressure });
    var first = paramTable[0];
    var last = paramTable[paramTable.length - 1];
    var upCalled = false;
    if (down != null)
        down(x, y, pressure);
    window.setTimeout(_move, interval);
    this.getParamTable = function () { //for test
        return paramTable;
    };
    this.move = function (x, y, pressure) {
        current.x = x;
        current.y = y;
        current.pressure = pressure;
    };
    this.up = function (x, y, pressure) {
        current.x = x;
        current.y = y;
        current.pressure = pressure;
        upCalled = true;
    };
    function dlerp(a, d, t) {
        return a + d * t;
    }
    function _move(justCalc) {
        var curr;
        var prev;
        var dx;
        var dy;
        var dp;
        var delta = 0;
        first.x = current.x;
        first.y = current.y;
        first.pressure = current.pressure;
        for (var i = 1; i < paramTable.length; ++i) {
            curr = paramTable[i];
            prev = paramTable[i - 1];
            dx = prev.x - curr.x;
            dy = prev.y - curr.y;
            dp = prev.pressure - curr.pressure;
            delta += Math.abs(dx);
            delta += Math.abs(dy);
            curr.x = dlerp(curr.x, dx, follow);
            curr.y = dlerp(curr.y, dy, follow);
            curr.pressure = dlerp(curr.pressure, dp, follow);
        }
        if (justCalc)
            return delta;
		//console.log('Stabilizer '+last.x+' '+last.y)
        if (upCalled) {
            while(delta > 1) {
                move(last.x, last.y, last.pressure);
                delta = _move(true);
            }
            up(last.x, last.y, last.pressure);
        }
        else {
            move(last.x, last.y, last.pressure);
            window.setTimeout(_move, interval);
        }
    }
};

Croquis.Random = {};
Croquis.Random.LFSR113 = function (seed) {
    var IA = 16807;
    var IM = 2147483647;
    var IQ = 127773;
    var IR = 2836;
    var a, b, c, d, e;
    this.get = function () {
        var f = ((a << 6) ^ a) >> 13;
        a = ((a & 4294967294) << 18) ^ f;
        f  = ((b << 2) ^ b) >> 27;
        b = ((b & 4294967288) << 2) ^ f;
        f  = ((c << 13) ^ c) >> 21;
        c = ((c & 4294967280) << 7) ^ f;
        f  = ((d << 3) ^ d) >> 12;
        d = ((d & 4294967168) << 13) ^ f;
        return (a ^ b ^ c ^ d) * 2.3283064365386963e-10 + 0.5;
    };
    seed |= 0;
    if (seed <= 0) seed = 1;
    e = (seed / IQ) | 0;
    seed = (((IA * (seed - ((e * IQ) | 0))) | 0) - ((IR * e) | 0)) | 0;
    if (seed < 0) seed = (seed + IM) | 0;
    if (seed < 2) a = (seed + 2) | 0 ; else a = seed;
    e = (seed / IQ) | 0;
    seed = (((IA * (seed - ((e * IQ) | 0))) | 0) - ((IR * e) | 0)) | 0;
    if (seed < 0) seed = (seed + IM) | 0;
    if (seed < 8) b = (seed + 8) | 0; else b = seed;
    e = (seed / IQ) | 0;
    seed = (((IA * (seed - ((e * IQ) | 0))) | 0) - ((IR * e) | 0)) | 0;
    if (seed < 0) seed = (seed + IM) | 0;
    if (seed < 16) c = (seed + 16) | 0; else c = seed;
    e = (seed / IQ) | 0;
    seed = (((IA * (seed - ((e * IQ) | 0))) | 0) - ((IR * e) | 0)) | 0;
    if (seed < 0) seed = (seed + IM) | 0;
    if (seed < 128) d = (seed + 128) | 0; else d = seed;
    this.get();
};

Croquis.Brush = function () {
    // math shortcut
    var min = Math.min;
    var max = Math.max;
    var abs = Math.abs;
    var sin = Math.sin;
    var cos = Math.cos;
    var sqrt = Math.sqrt;
    var atan2 = Math.atan2;
    var PI = Math.PI;
    var ONE = PI + PI;
    var QUARTER = PI * 0.5;
    var random = Math.random;
    this.setRandomFunction = function (value) {
        random = value;
    };
    this.clone = function () {
        var clone = new Brush(context);
        clone.setColor(this.getColor());
        clone.setFlow(this.getFlow());
        clone.setSize(this.getSize());
        clone.setSpacing(this.getSpacing());
        clone.setAngle(this.getAngle());
        clone.setRotateToDirection(this.getRotateToDirection());
        clone.setNormalSpread(this.getNormalSpread());
        clone.setTangentSpread(this.getTangentSpread());
        clone.setImage(this.getImage());
    };
    var context = null;
    this.getContext = function () {
        return context;
    };
    this.setContext = function (value) {
        context = value;
    };
    var color = '#000';
    this.getColor = function () {
        return color;
    };
    this.setColor = function (value) {
        color = value;
        transformedImageIsDirty = true;
    };
    var flow = 1;
    this.getFlow = function() {
        return flow;
    };
    this.setFlow = function(value) {
        flow = value;
        transformedImageIsDirty = true;
    };
    var size = 10;
    this.getSize = function () {
        return size;
    };
    this.setSize = function (value) {
        size = (value < 1) ? 1 : value;
        transformedImageIsDirty = true;
    };
    var spacing = 0.2;
    this.getSpacing = function () {
        return spacing;
    };
    this.setSpacing = function (value) {
        spacing = (value < 0.01) ? 0.01 : value;
    };
    var toRad = PI / 180;
    var toDeg = 1 / toRad;
    var angle = 0; // radian unit
    this.getAngle = function () { // returns degree unit
        return angle * toDeg;
    };
    this.setAngle = function (value) {
        angle = value * toRad;
    };
    var rotateToDirection = false;
    this.getRotateToDirection = function () {
        return rotateToDirection;
    };
    this.setRotateToDirection = function (value) {
        rotateToDirection = value;
    };
    var normalSpread = 0;
    this.getNormalSpread = function () {
        return normalSpread;
    };
    this.setNormalSpread = function (value) {
        normalSpread = value;
    };
    var tangentSpread = 0;
    this.getTangentSpread = function () {
        return tangentSpread;
    };
    this.setTangentSpread = function (value) {
        tangentSpread = value;
    };
    var image = null;
    var transformedImage = null;
    var transformedImageIsDirty = true;
    var imageRatio = 1;
    this.getImage = function () {
        return image;
    };
    this.setImage = function (value) {
        if (value == null) {
            transformedImage = image = null;
            imageRatio = 1;
            drawFunction = drawCircle;
        }
        else if (value != image) {
            image = value;
            imageRatio = image.height / image.width;
            transformedImage = document.createElement('canvas');
            drawFunction = drawImage;
            transformedImageIsDirty = true;
        }
    };
    var delta = 0;
    var prevX = 0;
    var prevY = 0;
    var lastX = 0;
    var lastY = 0;
    var dir = 0;
    var prevScale = 0;
    var drawFunction = drawCircle;
    var reserved = null;
    var dirtyRect;
    function spreadRandom() {
        return random() - 0.5;
    }
    function drawReserved() {
        if (reserved != null) {
            drawTo(reserved.x, reserved.y, reserved.scale);
            reserved = null;
        }
    }
    function appendDirtyRect(x, y, width, height) {
        if (!(width && height))
            return;
        var dxw = dirtyRect.x + dirtyRect.width;
        var dyh = dirtyRect.y + dirtyRect.height;
        var xw = x + width;
        var yh = y + height;
        var minX = dirtyRect.width ? min(dirtyRect.x, x) : x;
        var minY = dirtyRect.height ? min(dirtyRect.y, y) : y;
        dirtyRect.x = minX;
        dirtyRect.y = minY;
        dirtyRect.width = max(dxw, xw) - minX;
        dirtyRect.height = max(dyh, yh) - minY;
    }
	 this.addDirtyRect=function(x, y, width, height){//modify by zeg
		 return appendDirtyRect(x, y, width, height)
		}
    function transformImage() {
        transformedImage.width = size;
        transformedImage.height = size * imageRatio;
        var brushContext = transformedImage.getContext('2d');
        brushContext.clearRect(0, 0,
            transformedImage.width, transformedImage.height);
        brushContext.drawImage(image, 0, 0,
            transformedImage.width, transformedImage.height);
        brushContext.globalCompositeOperation = 'source-in';
        brushContext.fillStyle = color;
        brushContext.globalAlpha = flow;
        brushContext.fillRect(0, 0,
            transformedImage.width, transformedImage.height);
    }
    function drawCircle(size) {
        var halfSize = size * 0.5;
        context.fillStyle = color;
        context.globalAlpha = flow;
        context.beginPath();
        context.arc(halfSize, halfSize, halfSize, 0, ONE);
        context.closePath();
        context.fill();
    }
    function drawImage(size) {
        if (transformedImageIsDirty)
            transformImage();
        try {
            context.drawImage(transformedImage, 0, 0, size, size * imageRatio);
        }
        catch (e) {
            drawCircle(size);
        }
    }
    function drawTo(x, y, scale) {
        var scaledSize = size * scale;
        var nrm = dir + QUARTER;
        var nr = normalSpread * scaledSize * spreadRandom();
        var tr = tangentSpread * scaledSize * spreadRandom();
        var ra = rotateToDirection ? angle + dir : angle;
        var width = scaledSize;
        var height = width * imageRatio;
        var boundWidth = abs(height * sin(ra)) + abs(width * cos(ra));
        var boundHeight = abs(width * sin(ra)) + abs(height * cos(ra));
        x += Math.cos(nrm) * nr + Math.cos(dir) * tr;
        y += Math.sin(nrm) * nr + Math.sin(dir) * tr;
        context.save();
        context.translate(x, y);
        context.rotate(ra);
        context.translate(-(width * 0.5), -(height * 0.5));
        drawFunction(width);
        context.restore();
        appendDirtyRect(x - (boundWidth * 0.5),
                        y - (boundHeight * 0.5),
                        boundWidth, boundHeight);
    }
    this.down = function(x, y, scale) {
        if (context == null)
            throw 'brush needs the context';
        dir = 0;
        dirtyRect = {x: 0, y: 0, width: 0, height: 0};
        if (scale > 0) {
            if (rotateToDirection || normalSpread !== 0 || tangentSpread !== 0)
                reserved = {x: x, y: y, scale: scale};
            else
                drawTo(x, y, scale);
        }
        delta = 0;
        lastX = prevX = x;
        lastY = prevY = y;
        prevScale = scale;
    };
    this.move = function(x, y, scale) {
        if (context == null)
            throw 'brush needs the context';
        if (scale <= 0) {
            delta = 0;
            prevX = x;
            prevY = y;
            prevScale = scale;
            return;
        }
        var dx = x - prevX;
        var dy = y - prevY;
        var ds = scale - prevScale;
        var d = sqrt(dx * dx + dy * dy);
        prevX = x;
        prevY = y;
        delta += d;
        var midScale = (prevScale + scale) * 0.5;
        var drawSpacing = size * spacing * midScale;
        var ldx = x - lastX;
        var ldy = y - lastY;
        var ld = sqrt(ldx * ldx + ldy * ldy);
        dir = atan2(ldy, ldx);
        if (ldx || ldy)
            drawReserved();
        if (drawSpacing < 0.5)
            drawSpacing = 0.5;
        if (delta < drawSpacing) {
            prevScale = scale;
            return;
        }
        var scaleSpacing = ds * (drawSpacing / delta);
        if (ld < drawSpacing) {
            lastX = x;
            lastY = y;
            drawTo(lastX, lastY, scale);
            delta -= drawSpacing;
        } else {
            while(delta >= drawSpacing) {
                ldx = x - lastX;
                ldy = y - lastY;
                var tx = cos(dir);
                var ty = sin(dir);
                lastX += tx * drawSpacing;
                lastY += ty * drawSpacing;
                prevScale += scaleSpacing;
                drawTo(lastX, lastY, prevScale);
                delta -= drawSpacing;
            }
        }
        prevScale = scale;
    };
    this.up = function (x, y, scale) {
        dir = atan2(y - lastY, x - lastX);
        drawReserved();
        return dirtyRect;
    };
};
/*
//https://github.com/dobarkod/canvas-bezier-multiple/
function bezierCurveThrough(ctx, points, tension) {
tension = tension || 0.25;// Default tension of one-quarter gives nice results
var l = points.length;
if (l < 2) return;
ctx.beginPath();
if (l == 2) {
	 ctx.moveTo(points[0][0], points[0][1]);
	 ctx.lineTo(points[1][0], points[1][1]);
	 ctx.stroke();
	 return;
	}
function h(x, y) {
	 return Math.sqrt(x * x + y * y);
	}
var cpoints = [];
points.forEach(function() {
	 cpoints.push({});
});
for (var i = 1; i < l - 1; i++) {
	var pi = points[i], 
		 pp = points[i - 1], 
		 pn = points[i + 1]; 

	var rdx = pn[0] - pp[0], 
		 rdy = pn[1] - pp[1], 
		 rd = h(rdx, rdy), 
		 dx = rdx / rd, 
		 dy = rdy / rd; 

	var dp = h(pi[0] - pp[0], pi[1] - pp[1]),
		 dn = h(pi[0] - pn[0], pi[1] - pn[1]);

	var cpx = pi[0] - dx * dp * tension,
		 cpy = pi[1] - dy * dp * tension,
		 cnx = pi[0] + dx * dn * tension,
		 cny = pi[1] + dy * dn * tension;

	cpoints[i] = {
	  cp: [cpx, cpy],
	  cn: [cnx, cny]
	  }
	}
cpoints[0] = {cn: [ (points[0][0] + cpoints[1].cp[0]) / 2, (points[0][1] + cpoints[1].cp[1]) / 2 ]}
cpoints[l - 1] = {cp: [ (points[l - 1][0] + cpoints[l - 2].cn[0]) / 2, (points[l - 1][1] + cpoints[l - 2].cn[1]) / 2 ]}
ctx.moveTo(points[0][0], points[0][1])
for (i = 1; i < l; i++) {
	var p = points[i],
		 cp = cpoints[i],
		 cpp = cpoints[i - 1];
	ctx.bezierCurveTo(cpp.cn[0], cpp.cn[1], cp.cp[0], cp.cp[1], p[0], p[1]);
	}
ctx.stroke();
}//

*/


/* 
 * MIT License
 *  You may use this code as long as you retain this notice.  Use at your own risk! :)
 *  https://github.com/danschumann/limby-resize
 *  0.0.8
 */
commonui.imageCanvasDownScaleHighQuality = function(original, tow,toh) {
var canvas = document.createElement('canvas');
canvas.width = tow;
canvas.height = toh;
var
w1 = original.width,
h1 = original.height,
w2 = canvas.width,
h2 = canvas.height,
img = original.getContext("2d").getImageData(0, 0, w1, h1),
img2 = canvas.getContext("2d").getImageData(0, 0, w2, h2);

if (w2 > w1 || h2 > h1) {
	canvas.getContext('2d').drawImage(original, 0, 0, w2, h2);
	return callback();
	};


var data = img.data;
// it's an _ because we don't use it much, as working with doubles isn't great
var _data2 = img2.data;
// Instead, we enforce float type for every entity in the array
// this prevents weird faded lines when things get rounded off
var data2 = Array(_data2.length);
for (var i = 0; i < _data2.length; i++){
	data2[i] = 0.0;
	}

// We track alphas, since we need to use alphas to correct colors later on
var alphas = Array(_data2.length >> 2);
for (var i = 0; i < _data2.length >> 2; i++){
	alphas[i] = 1;
	}

// this will always be between 0 and 1
var xScale = w2 / w1;
var yScale = h2 / h1;

var deferred;

// We process 1 row at a time ( and then let the process rest for 0ms [async] )
var nextY = function(y1){
	for (var x1 = 0; x1 < w1; x1++) {

		var

		// the original pixel is split between two pixels in the output, we do an extra step
		extraX = false,
		extraY = false,

		// the output pixel
		targetX = Math.floor(x1 * xScale),
		targetY = Math.floor(y1 * yScale),

		// The percentage of this pixel going to the output pixel (this gets modified)
		xFactor = xScale,
		yFactor = yScale,

		// The percentage of this pixel going to the right neighbor or bottom neighbor
		bottomFactor = 0,
		rightFactor = 0,

		// positions of pixels in the array
		offset = (y1 * w1 + x1) * 4,
		targetOffset = (targetY * w2 + targetX) * 4;

		// Right side goes into another pixel 
		if (targetX < Math.floor((x1 + 1) * xScale)) {

			rightFactor = (((x1 + 1) * xScale) % 1);
			xFactor -= rightFactor;

			extraX = true;

			}

		// Bottom side goes into another pixel
		if (targetY < Math.floor((y1 + 1) * yScale)) {

			bottomFactor = (((y1 + 1) * yScale) % 1);
			yFactor -= bottomFactor;

			extraY = true;

			}

		var a;

		a = (data[offset + 3] / 255);

		var alphaOffset = targetOffset / 4;

		if (extraX) {

			// Since we're not adding the color of invisible pixels,  we multiply by a
			data2[targetOffset + 4] += data[offset] * rightFactor * yFactor * a;
			data2[targetOffset + 5] += data[offset + 1] * rightFactor * yFactor * a;
			data2[targetOffset + 6] += data[offset + 2] * rightFactor * yFactor * a;

			data2[targetOffset + 7] += data[offset + 3] * rightFactor * yFactor;

			// if we left out the color of invisible pixels(fully or partly)
			// the entire average we end up with will no longer be out of 255
			// so we subtract the percentage from the alpha ( originally 1 )
			// so that we can reverse this effect by dividing by the amount.
			// ( if one pixel is black and invisible, and the other is white and visible,
			// the white pixel will weight itself at 50% because it does not know the other pixel is invisible
			// so the total(color) for the new pixel would be 128(gray), but it should be all white.
			// the alpha will be the correct 128, combinging alphas, but we need to preserve the color 
			// of the visible pixels )
			alphas[alphaOffset + 1] -= (1 - a) * rightFactor * yFactor;
			}

		if (extraY) {
			data2[targetOffset + w2 * 4]     += data[offset] * xFactor * bottomFactor * a;
			data2[targetOffset + w2 * 4 + 1] += data[offset + 1] * xFactor * bottomFactor * a;
			data2[targetOffset + w2 * 4 + 2] += data[offset + 2] * xFactor * bottomFactor * a;

			data2[targetOffset + w2 * 4 + 3] += data[offset + 3] * xFactor * bottomFactor;

			alphas[alphaOffset + w2] -= (1 - a) * xFactor * bottomFactor;
			}

		if (extraX && extraY) {
			data2[targetOffset + w2 * 4 + 4]     += data[offset] * rightFactor * bottomFactor * a;
			data2[targetOffset + w2 * 4 + 5] += data[offset + 1] * rightFactor * bottomFactor * a;
			data2[targetOffset + w2 * 4 + 6] += data[offset + 2] * rightFactor * bottomFactor * a;

			data2[targetOffset + w2 * 4 + 7] += data[offset + 3] * rightFactor * bottomFactor;

			alphas[alphaOffset + w2 + 1] -= (1 - a) * rightFactor * bottomFactor;
			}
			
		data2[targetOffset]     += data[offset] * xFactor * yFactor * a;
		data2[targetOffset + 1] += data[offset + 1] * xFactor * yFactor * a;
		data2[targetOffset + 2] += data[offset + 2] * xFactor * yFactor * a;

		data2[targetOffset + 3] += data[offset + 3] * xFactor * yFactor;

		alphas[alphaOffset] -= (1 - a) * xFactor * yFactor;
		};

	//if (y1++ < h1) {
		// Big images shouldn't block for a long time.
		// This breaks up the process and allows other processes to tick
		//setTimeout(function(){
		//	nextY(y1)
		//	}, 0);
	//	}
	//else
		// done();

	};

var done = function(){
	// fully distribute the color of pixels that are partially full because their neighbor is transparent
	// (i.e. undo the invisible pixels are averaged with visible ones)
	for (var i = 0; i < (_data2.length >> 2); i++){
		if (alphas[i] && alphas[i] < 1) {
			data2[(i<<2)] /= alphas[i];     // r
			data2[(i<<2) + 1] /= alphas[i]; // g
			data2[(i<<2) + 2] /= alphas[i]; // b
			}
		}

	// re populate the actual imgData
	for (var i = 0; i < data2.length; i++){
		_data2[i] = Math.round(data2[i]);
		}

	var context = canvas.getContext("2d")
	context.putImageData(img2, 0, 0);
	return canvas

	};

// Start processing the image at row 0
for(var ii=0;ii<h1;ii++)
	nextY(ii);
return done()
};
