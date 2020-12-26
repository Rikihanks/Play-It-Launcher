import { trigger, transition, style, animate } from "@angular/animations";

export const ProfilePicAnim = trigger(
    'inOutAnimation', 
    [
      transition(
        ':enter', 
        [
          style({  opacity: 0, boxShadow: 'none', offset: 0 }),
          animate('2s ease-out', 
                  style({ opacity: 1 , boxShadow: '0 0 35px #39ceb0', offset: 0.1}))
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
  )

  export const GamePicAnim = trigger(
    'inOutAnimation', 
    [
      transition(
        ':enter', 
        [
          style({  opacity: 0, offset: 0 }),
          animate('0.5s ease-in', 
                  style({ opacity: 1 , offset: 0.1}))
        ]
      ),
      transition(
        ':leave', 
        [
          style({ height: 300, opacity: 1 }),
          animate('0.5s ease-in', 
                  style({ height: 0, opacity: 0 }))
        ]
      )
    ]
  )