import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { LocalstorageService } from './localstorage.service';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogged } from '../shared/interfaces';
import { TruckService } from './truck.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: UserLogged | undefined;
  userBehavior: BehaviorSubject<User> = new BehaviorSubject<User>({
    email: '',
    birthday: '',
    fullName: '',
    uid: '',
    completedProfile: false,
  })
  
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private localStorage: LocalstorageService,
    private truckService: TruckService
  ) {

  }

  // Login in with email/password
  signIn(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Register user with email/password
  registerUser(email: string, password: string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  registerSetUserData(userLogged: UserLogged) {
    this.userLogged = userLogged;
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${userLogged.user.uid}`);
    return userRef.set(userLogged.user, {
      merge: true
    });
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    return userRef.set(user, {
      merge: true
    });
  }

  getUserData(uid: string) {
    return this.afStore.collection('users').doc(uid).valueChanges();
  }

  // Sign-out 
  async signOut() {
    await this.ngFireAuth.signOut();
    this.userLogged = {
      user: {
        email: '',
        fullName: '',
        uid: '',
        completedProfile: false
      }
    };
    this.userBehavior.next({
      email: '',
      birthday: '',
      fullName: '',
      uid: '',
      completedProfile: false,
    });
    this.localStorage.clear();
    this.truckService.clearInterval();
    this.router.navigate(['login']);
  }

}
