
import { style, trigger, transition, animate, query, keyframes } from '@angular/animations';

export const routerAnimations =
trigger('routerAnimations', [
    transition('* => *', [
        query(
            ':enter',
            [
                style({ opacity: 0, maxHeight:'0px', minHeight:'0px', height: '0px'}),
            ],
            { optional: true }
            ),
        query(
            ':leave',
            [
                animate('0.5s ease-in', style({ opacity: 0, maxHeight:'0px', minHeight:'0px', height:'0px'})),
            ],
            { optional: true }
            ),
        query(
            ':enter',
            [
                animate('0.5s ease-in', style({opacity: 1, maxHeight:'100%', minHeight:'100%', height: '100%'})),
            ],
            { optional: true }
            )
    ])
]);


export const fadeAnimations =
trigger(
  'fadeAnimations',
  [
    transition(
      ':enter',
      [
        style({ height: 0, opacity: 0 }),
        animate('1s ease-out',
                style({ height: 300, opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ height: 300, opacity: 1 }),
        animate('1s ease-in',
                style({ height: 0, opacity: 0 }))
      ]
    )
  ]
);


export const fadeUpAnimations =
trigger(
  'fadeUpAnimations',
  [
    transition(
      ':enter',
      [
        style({ height: 0, transform:'translateY(50vh)', opacity: 0 }),
        animate('1s ease-out',
                style({ height: 'initial', transform:'translateY(0vh)', opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ height: 'initial', transform:'translateY(0vh)', opacity: 1 }),
        animate('0.25s ease-in',
                style({ height: 0, transform:'translateY(50vh)', opacity: 0 }))
      ]
    )
  ]
);


export const fadeDownAnimations =
trigger(
  'fadeDownAnimations',
  [
    transition(
      ':enter',
      [
        style({ height: 0, transform:'translateY(-50vh)', opacity: 0 }),
        animate('1s ease-out',
                style({ height: 'initial', transform:'translateY(0vh)', opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ height: 'initial', transform:'translateY(0vh)', opacity: 1 }),
        animate('0.25s ease-in',
                style({ height: 0, transform:'translateY(-50vh)', opacity: 0 }))
      ]
    )
  ]
);

export const valueChangeFadeAnimations = trigger(
  'valueChangeFadeAnimations',
  [
      transition('void => *', []),   // when the item is created
      transition('* => void', []),   // when the item is removed
      transition('* => *', [         // when the item is changed
          animate(200, keyframes([  // animate for 1200 ms
              style ({color: '#FFFFFF00'}),
              style ({color: '#FFFFFF'}),
          ])),
      ]),
  ]);

  export const animateDayChange = trigger(
    'animateDayChange',
    [
        transition('void => *', [
          style ({opacity:0, transform: 'translateY(-100vh)'}),
          animate(2000, keyframes([
              style ({opacity:1, transform: 'translateY(0vh)'}),
          ])),
      ]),
        transition('* => void', [
          style ({opacity:1, transform: 'translateY(0vh)'}),
          animate(2000, keyframes([
              style ({opacity:0, transform: 'translateY(100vh)'}),
          ])),
      ]),
        transition('* => *', []),
    ]);




  export const slideUpAnimations =
  trigger(
    'slideUpAnimations',
    [
      transition(
        ':enter',
        [
          style({ transform:'translateY(-200vh)' }),
          animate('1s ease-out',
                  style({ transform:'translateY(0vh)'}))
        ]
      ),
      transition(
        ':leave',
        [
          style({  transform:'translateY(0vh)'}),
          animate('1s ease-in',
                  style({  transform:'translateY(200vh)'}))
        ]
      )
    ]
  );
  