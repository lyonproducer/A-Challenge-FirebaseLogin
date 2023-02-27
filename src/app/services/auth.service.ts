import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: any;
  
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private localStorage: LocalstorageService
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

  registerSetUserData(userLogged: any) {
    this.userLogged = userLogged;
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${userLogged.user.uid}`);
    return userRef.set(userLogged.user, {
      merge: true
    });
  }

  updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    return userRef.set(user, {
      merge: true
    });
  }

  getUserData(uid: string) {
    return this.afStore.collection('users').doc(uid).valueChanges();
  }

  // Sign-out 
  signOut() {
    return this.ngFireAuth.signOut().then(() => {
      this.userLogged = {
        user: {
          email: '',
          password: '',
          name: '', 
          uid:null
        }
      };
      //this.localStorage.clear();
      this.router.navigate(['login']);
    })
  }

  //history endpoints 
  getHistory(uid: string) {
    return this.afStore.collection('history', ref=> ref.where("uid", "==", uid)).valueChanges();
  }

  addHistory(data: any) {
    return this.afStore.collection('history').add(Object.assign({}, data));
    // return this.businessCollection.add(business);
  }

  updateHistoryData(data: any, id: string) {
    const dataRef: AngularFirestoreDocument<any> = this.afStore.doc(`history/${id}`);
    return dataRef.set(data, {
      merge: true
    });
  }

}