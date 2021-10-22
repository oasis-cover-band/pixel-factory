
import { style, trigger, transition, animate, query, keyframes } from '@angular/animations';

export const routerAnimations =
trigger('routerAnimations', [
    transition('* => *', [
        query(
            ':enter',
            [
                style({transform:'translateY(100vh)'}),
            ],
            { optional: true }
            ),
        query(
            ':leave',
            [
                animate('1s ease-out', style({transform:'translateY(-100vh)', height: '0px'})),
            ],
            { optional: true }
            ),
        query(
            ':enter',
            [
                animate('1s ease-out', style({transform:'translateY(0vh)'})),
            ],
            { optional: true }
            )
    ])
]);