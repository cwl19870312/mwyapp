import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const Animations = {
    zoom: trigger('zoom', [
        transition('void => *', [
            animate('200ms ease', keyframes([
                style({ transform: 'scale3d(0.95,0.95,1)', opacity: 0  }),
                style({ transform: 'scale3d(1,1,1)', opacity: 1 })
            ]))
        ]),
        transition('* => void', [
            animate('200ms ease', keyframes([
                style({ transform: 'scale3d(1,1,1)', opacity: 1 }),
                style({ transform: 'scale3d(0.95,0.95,1)', opacity: 0  })
            ]))
        ])
    ]),
    fade: trigger('fade', [
        transition('void => *', [
            animate('200ms ease', keyframes([
                style({ opacity: 0 }),
                style({ opacity: 1 }),
            ]))
        ]),
        transition('* => void', [
            animate('200ms ease', keyframes([
                style({ opacity: 1 }),
                style({ opacity: 0 })
            ]))
        ])
    ]),
    slideUp: trigger('slideUp', [
        transition('void => *', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(0,5%,0)' }),
                style({ transform: 'translate3d(0,0,0)' })
            ]))
        ]),
        transition('* => void', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(0,0,0)' }),
                style({ transform: 'translate3d(0,5%,0)' }),
            ]))
        ])
    ]),
    fadeSlideUp: trigger('fadeSlideUp', [
        transition('void => *', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(0,0.6rem,0)', opacity: 0 }),
                style({ transform: 'translate3d(0,0,0)', opacity: 1 })
            ]))
        ]),
        transition('* => void', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(0,0,0)', opacity: 1 }),
                style({ transform: 'translate3d(0,0.6rem,0)', opacity: 0 }),
            ]))
        ])
    ]),
    fadeSlideDown: trigger('fadeSlideDown', [
        transition('void => *', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(0,-5%,0)', opacity: 0 }),
                style({ transform: 'translate3d(0,0,0)', opacity: 1 })
            ]))
        ]),
        transition('* => void', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(0,0,0)', opacity: 1 }),
                style({ transform: 'translate3d(0,-5%,0)', opacity: 0 }),
            ]))
        ])
    ]),
    fadeSlideRight: trigger('fadeSlideRight', [
        transition('void => *', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(20%,0,0)', opacity: 0 }),
                style({ transform: 'translate3d(0,0,0)', opacity: 1 })
            ]))
        ]),
        transition('* => void', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(0,0,0)', opacity: 1 }),
                style({ transform: 'translate3d(20%,0,0)', opacity: 0 }),
            ]))
        ])
    ]),
    popupFade: trigger('popupFade', [
        transition('void => *', [
            animate('400ms ease', keyframes([
                style({ opacity: 0 }),
                style({ opacity: 1 }),
            ]))
        ]),
        transition('* => void', [
            animate('400ms ease', keyframes([
                style({ opacity: 1 }),
                style({ opacity: 0 })
            ]))
        ])
    ]),
    popupUp: trigger('popupUp', [
        transition('void => *', [
            animate('400ms ease', keyframes([
                style({ transform: 'translate3d(0,100%,0)' }),
                style({ transform: 'translate3d(0,0,0)' })
            ]))
        ]),
        transition('* => void', [
            animate('400ms ease', keyframes([
                style({ transform: 'translate3d(0,0,0)' }),
                style({ transform: 'translate3d(0,100%,0)' }),
            ]))
        ])
    ]),
    routeAnimation: trigger('routeAnimation', [
        state('*',
            style({
                position:'absolute',
                top:0,
                bottom:0,
                left:0,
                right:0
            })
        ),
        transition(':enter', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(20%,0,0)', opacity: 0 }),
                style({ transform: 'translate3d(0,0,0)', opacity: 1 })
            ]))
        ]),
        transition(':leave', [
            animate('200ms ease', keyframes([
                style({ transform: 'translate3d(0,0,0)', opacity: 1 }),
                style({ transform: 'translate3d(20%,0,0)', opacity: 0 }),
            ]))
        ])
    ]),
}