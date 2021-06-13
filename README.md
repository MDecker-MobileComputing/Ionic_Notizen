# Storing notes in Firestore #

Simple Ionic using [Firestore](https://firebase.google.com/docs/firestore/) to store notes.

<br>

----

## Firebase Configuration ##

Create a Firebase project.

Enable "Email address and password" as "sign-in method" under "Authentication".

For *Firestore* the following rule has to be configured:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notizensammlung/{nutzer_uid} {

      function istAngemeldet() {
            return request.auth.uid != null;
      }
      allow read : if istAngemeldet() && request.auth.uid == resource.data.nutzer_uid;
      allow write: if istAngemeldet();
    }
  }
}
```
Solution according to [this answer on SO](https://stackoverflow.com/a/55115937)

<br>

Create an Index on collection `notizensammlung` for the following fields:
* `nutzer_uid` ascending
* `zeitstempel` ascending

<br>

----

## License ##

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License) for the files in this repository.

<br>
