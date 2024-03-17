
# Musik 

An api for listen music, add your favorite music into playlist and artist can add their music 




## Installation

Install Authentication Application with npm

1.First clone the Repository by pasting the command given below in the terminal.
```bash
  git clone https://github.com/astitva3110/musik.git
```
 2.Set-up mongodb in pc 

## Running Tests

1.Register (POST)

```bash
  http://localhost:3000/signup
```
```bash
  {
  "name": "abc",
  "email": "abc@gmail.com",
  "password": "123"
}

```
Output
```bash
  {
  "name": "abc",
  "email": "abc@gmail.com",
  "password": "123"
   "profile_picture": "",
    "follower": [],
    "following": [],
    "isAdmin": false,
    "_id": "_id",
}

```
2.Login(post)
```bash
http://localhost:3000/login
```
```bash
  {
  "email":"abc@gmail.com",
     "password": "123"
}
```
3.Create Playlist(post)
```bash
http://localhost:3000/createPlaylist/:user_id
```
```bash
  {
    "message": "User playlist is created",
    "Playlist": {
        "user": "user_id",
        "song": [],
        "text": "Arijit",
        "_id": "playlist_id",
        "createdAt": "2024-03-11T17:47:32.465Z",
        "updatedAt": "2024-03-11T17:47:32.465Z",
        "__v": 0
    }
}
```

4.like a song(post)
```bash
http://localhost:3000/LikedSong/song_id
```
```bash 
{
  "user_id":"user_id"
 }
```
Output
```bash
 {
    "message": "song is liked"
}
```

5.Search a song(get)
```bash
http://localhost:3000/search/:query
```
Output
```bash
[
    {
        "album": [],
        "artist": [],
        "_id": "song_id",
        "name": "Irraday",
        "song": "audio.mp3"
    }
]
```


4.Create a album for artist(post)
```bash
http://localhost:3000/createAlbum/:user_id
```
```bash 
{
    "text":"My first album"
 }
```
Output
```bash
 {
    "message": "album is created"
 }
```
## Features

- The password is protected using bcrypt.
- User can create and edit a playlist.
- Artist can create a ablum for listener.
- Uploading of song is available.
- User can like and unlike a song.
- Docker containerization is implemented.
- GraphQL is implemented.




