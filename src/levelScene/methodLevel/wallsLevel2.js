const ww = window.innerWidth;
const wh = window.innerHeight;

export const walls = [
    [ww * (5.5/24), wh *  (1/8) ,     ww * (11/24),  wh * (2/8) ],
    [ww * (1.5/24), wh *  (5/8) ,     ww * (3/24),   wh * (6/8) ],
    [ww * (5.5/24), wh *  (14.5/16) , ww * (2.5/12), wh * (1.5/8)],
    [ww * (18/24),  wh *  (1.5/16) ,  ww * (6/12),   wh * (1.5/8)],
    [ww * (22/24),  wh *  (10/16) ,   ww * (2/12),   wh * (0.2/8)],
    [ww * (14/24),  wh *  (10/16) ,   ww * (2/12),   wh * (0.2/8)],
    [ww * (12/24),  wh *  (10.5/16) , ww * (0.25/24),wh * (1/16)],
    [ww * (12/24),  wh *  (15/16) ,   ww * (0.25/24),wh * (2/16)],
    [ww * (23/24),  wh *  (6.5/16) ,  ww * (1/12),   wh * (3.5/8)],
];