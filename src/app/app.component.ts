import { Component, OnInit, VERSION } from '@angular/core';
import {
  distinct,
  filter,
  from,
  fromEvent,
  map,
  Observable,
  of,
  Subscription,
  take,
  tap,
} from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  slovnik: Map<number, string> = new Map<number, string>();
  ngOnInit(): void {
    console.log('oninit');
    this.slovnik.set(1, 'one');
    this.slovnik.set(2, 'two');
    this.slovnik.set(3, 'three');
    this.slovnik.set(4, 'four');
    this.slovnik.set(5, 'five');

    const obs1$: Observable<number> = of(1, 1, 1, 2, 2);
    obs1$.subscribe((x: number) => {
      console.log(x);
    });

    const obs2$: Observable<number> = obs1$.pipe(
      map((x: number) => 10 * x),
      tap((x: number) => console.log('tap dava: ' + x)),
      map((x: number) => x + 17),
      filter((x: number) => {
        console.log('filter');
        return x > 50;
      })
    );

    obs2$.subscribe((x: number) => {
      console.log('number po map: ' + x);
    });

    const obs3$: Observable<string> = obs1$.pipe(
      map((x: number) => {
        return this.slovnik.get(x);
      })
    );

    obs3$.subscribe((x: string) => {
      console.log('number po map slovo: ' + x);
    });

    const obs4$: Observable<number> = obs1$.pipe(
      filter((x: number) => {
        const preklad: string = this.slovnik.get(x);
        return preklad.length > 3;
      })
    );

    obs4$.subscribe((x: number) => {
      console.log('number po filter na dlzku slova: ' + x);
    });

    obs1$.pipe(distinct()).subscribe((x: number) => {
      console.log('number po map a filter 2: ' + x);
    });

    obs1$.pipe(take(4)).subscribe((x: number) => {
      console.log('number po map a filter 3: ' + x);
    });

    obs1$.pipe(first()).subscribe((x: number) => {
      console.log('number po map a filter 4: ' + x);
    });

    const obs5$: Observable<number> = obs1$.pipe(
      filter((x: number) => {
        const preklad: string = this.slovnik.get(x);
        return preklad.length > 3;
      })
    );

    obs5$.subscribe((x: number) => {
      console.log('number po map slovo: ' + x);
    });
  }
}
