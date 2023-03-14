import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('SignUpPage <=> LogInPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ], { optional: true }),
      ]),
    ]),
    // start ExpensePage <=> DashboardPage
    transition('ExpensePage => DashboardPage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('DashboardPage => ExpensePage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    // end ExpensePage <=> DashboardPage

    // start ExpensePage <=> CategoryPage
    transition('ExpensePage => CategoryPage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('CategoryPage => ExpensePage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    // end ExpensePage <=> CategoryPage

    // start ExpensePage <=> ProfilePage
    transition('ExpensePage => ProfilePage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('ProfilePage => ExpensePage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    // end ExpensePage <=> ProfilePage

    // start DashboardPage <=> CategoryPage
    transition('DashboardPage => CategoryPage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('CategoryPage => DashboardPage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    // end DashboardPage <=> CategoryPage

    // start CategoryPage <=> ProfilePage
    transition('CategoryPage => ProfilePage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('ProfilePage => CategoryPage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    // end CategoryPage <=> ProfilePage

    // start ExpenseFormPage <=> *
    transition('* => ExpenseFormPage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)', opacity: 1 }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('ExpenseFormPage => *', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateY(-100%)', opacity: 0 }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)', opacity: 1 }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    // end ExpenseFormPage <=> *

    // start CategoryFormPage <=> *
    // start ExpenseFormPage <=> *
    transition('* => CategoryFormPage', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)', opacity: 1 }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('CategoryFormPage => *', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateY(-100%)', opacity: 0 }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)', opacity: 1 }),
          animate('0.5s ease-in-out', style({ transform: 'translateY(100%)', opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    // end CategoryFormPage <=> *
    transition('* <=> *', [    
      query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
      group([ 
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ])
  ]);