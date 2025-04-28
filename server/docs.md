# **Dokumentasi API resep bunda mikel :3**

## cara menggunakan

Untuk menggunakan API, perlu rute yang ingin dituju dan juga data request yang berbentuk json. Berikut contoh mengirim request ke api dan mendapatkan data response yang juga berupa json dengan http method **POST**

```Typescript
fetch('https://route/to/api', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        // Your request body here
    })
})
    .then(response => response.json())
    .then(data => {
        // Handle the data here
        console.log(data);
    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });
```

## Rute yang tersedia

Rute yang tersedia dapat dikelompokkan menjadi 3, yaitu rute **recipes**, rute **social**, dan rute **user**. Berikut lebih detilnya

### recipes

#### 1. get_some (random)

rute untuk mendapatkan n buah resep diambil secara random

1. HTML method  : 'GET'
2. route        : /api/recipes/get_some/n  (n adalah jumlah resep)
3. request      : - 
4. response     : json array resep resep (definisi resep dapat dilihat di server/models/User.js)

#### 2. get_most_liked

rute untuk mendapatkan n resep yang paling banyak disukai

1. HTML method  : 'GET'
2. route        : /api/recipes/get_most_liked/n  (n adalah jumlah resep)
3. request      : -
4. response     : json array resep resep (definisi resep dapat dilihat di server/models/User.js)

#### 3. get_most_recent

rute untuk mendapatkan n resep yang paling baru

1. HTML method  : 'GET'
2. route        : /api/recipes/get_most_recent/n  (n adalah jumlah resep)
3. request      : -
4. response     : json array resep resep (definisi resep dapat dilihat di server/models/User.js)

#### 4. get_some_by_id

rute untuk mendapatkan n resep berdasarkan id

1. HTML method  : 'POST'
2. route        : /api/recipes/get_some_by_id
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: JSON.stringify({
        'ids': ['id1', 'id2', 'id3']
    })
```

4. response     : json array resep resep (definisi resep dapat dilihat di server/models/User.js)

#### 5. create recipe

rute menginput resep baru ke database (perlu token jwt yang didapat dari login terlebih dahulu) 

1. HTML method  : 'POST'
2. route        : /api/recipes/create
3. request      :

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenjwthexadesimalyangdidapatsetelahlogin'
    },
body: JSON.stringify({
  "title" : "Bibimbap",
  "description" : "Secara harafiah, arti bibimbap sendiri adalah nasi campur. Biasnya disajikan dengan tumisan daging, sayuran dan saus gochujang. Gochujang berwarna merah karena bahan dasarnya adalah cabai merah, yang merupakan serpihan cabai kering yang disebut gochugaru. Di sini saya sajikan bibimbap dengan tahu, sayuran , telur dan saus gochujang tentunya, enak bernutrisi dan bikin kenyang 😀. Saya tambahkan tumisan kates ebinya mbak @Meyscila_28 , sbg salah satu sayuran pelengkapnya, makasih ya mbak, enak gurih ini❤. Yukk share juga kreasimu @arnimunawati83 @marthanaibaho11 dan lakukan SADARI secara rutin yaa..",
  "ingredients" : [
"1 porsi nasi putih",
"2 sdm saos gochujang",
"1 butir telur",
"150 gram tahu",
"150 gram pepaya mengkal, parut",
"1/2 sdm ebi, rendam sampai lembut",
"2 siung bawang putih",
"1/2 sdt garam",
"1/4 sdt gula pasir",
"30 gram bayam merah yang sudah dipetiki daunnya",
"50 gram wortel, parut",
"50 gram tauge",
"Minyak utk menumis",
"1/4 sdt wijen sangrai"
  ],
  "instructions" : [
    {"step" : "Potong dadu, tahu, dan goreng asal berkulit.", "time" : 5},
    {"step" : "Buat telur mata sapi. Tumis bawang putih sampai wangi, masak pepaya dan ebi, tumis sampai matang, bubuhi garam dan gula, aduk rata, sisihkan.", "time" : 10},
    {"step" : "Tumis sebentar tauge asal layu, bubuhi garam. Lakukan hal serupa pada wortel dan bayam merah.", "time" : 15},
    {"step" : "Campurkan seluruh bahan siram lalu masak hingga mendidih", "time" : 5},
    {"step" : "Tata nasi, sayur-sayuran dan telur pada pring saji, tambahkan saus gochujang,taburi dengan wijen sangrai. sajikan.", "tIme" : 5}
  ],
  "timeToCreate" : 40,
  "difficulty" : 2,
  "servings" : 1,
  "image" : "https://img-global.cpcdn.com/recipes/29c3ea55d8630e97/1360x964cq70/bibimbap-dg-bayam-merah-foto-resep-utama.webp"
    })
```

4. response     : -

#### 6. get recipe

untuk mendapatkan satu resep berdasarkan ID resep

1. HTML method  : 'GET'
2. route        : /api/recipes/get/id    (id adalah id resep pada database)
3. request      : -
4. response     : json resep (definisi resep dapat dilihat di server/models/User.js)

#### 7. update recipe

mengupdate resep berdasarkan ID dengan cara mengirimkan resep baru dan meng override data lama di database

1. HTML method  : 'PUT'
2. route        : /api/recipes/update/id    (id adalah id resep pada database)
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenjwthexadesimalyangdidapatsetelahlogin'
    },
body: JSON.stringify({
  "title" : "Bibimbap",
  "description" : "Secara harafiah, arti bibimbap sendiri adalah nasi campur. Biasnya disajikan dengan tumisan daging, sayuran dan saus gochujang. Gochujang berwarna merah karena bahan dasarnya adalah cabai merah, yang merupakan serpihan cabai kering yang disebut gochugaru. Di sini saya sajikan bibimbap dengan tahu, sayuran , telur dan saus gochujang tentunya, enak bernutrisi dan bikin kenyang 😀. Saya tambahkan tumisan kates ebinya mbak @Meyscila_28 , sbg salah satu sayuran pelengkapnya, makasih ya mbak, enak gurih ini❤. Yukk share juga kreasimu @arnimunawati83 @marthanaibaho11 dan lakukan SADARI secara rutin yaa..",
  "ingredients" : [
"1 porsi nasi putih",
"2 sdm saos gochujang",
"1 butir telur",
"150 gram tahu",
"150 gram pepaya mengkal, parut",
"1/2 sdm ebi, rendam sampai lembut",
"2 siung bawang putih",
"1/2 sdt garam",
"1/4 sdt gula pasir",
"30 gram bayam merah yang sudah dipetiki daunnya",
"50 gram wortel, parut",
"50 gram tauge",
"Minyak utk menumis",
"1/4 sdt wijen sangrai"
  ],
  "instructions" : [
    {"step" : "Potong dadu, tahu, dan goreng asal berkulit.", "time" : 5},
    {"step" : "Buat telur mata sapi. Tumis bawang putih sampai wangi, masak pepaya dan ebi, tumis sampai matang, bubuhi garam dan gula, aduk rata, sisihkan.", "time" : 10},
    {"step" : "Tumis sebentar tauge asal layu, bubuhi garam. Lakukan hal serupa pada wortel dan bayam merah.", "time" : 15},
    {"step" : "Campurkan seluruh bahan siram lalu masak hingga mendidih", "time" : 5},
    {"step" : "Tata nasi, sayur-sayuran dan telur pada pring saji, tambahkan saus gochujang,taburi dengan wijen sangrai. sajikan.", "tIme" : 5}
  ],
  "timeToCreate" : 40,
  "difficulty" : 2,
  "servings" : 1,
  "image" : "https://img-global.cpcdn.com/recipes/29c3ea55d8630e97/1360x964cq70/bibimbap-dg-bayam-merah-foto-resep-utama.webp"
    })
```

4. respsonse    : -

#### 8. delete recipe

menghapus resep dari database, hanya bisa dilakukan olel pembuat resep

1. HTML method  : 'DELETE'
2. route        : /api/recipes/delete/id    (id adalah id resep pada database)
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenjwthexadesimalyangdidapatsetelahlogin'
    }
```

4. response     : -

#### 9. search recipe

mencari resep berdasarkan judul resep

1. HTML method  : 'GET'
2. route        : /api/recipes/search/query    (query adalah keyword untuk mencari judul resep)
3. request      : -
4. response     : json array resep (definisi resep dapat dilihat di server/models/User.js)

### user

#### 1. register

rute untuk mendafatarkan pengguna baru

1. HTML method  : 'POST'
2. route        : /api/user/register
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: JSON.stringify({
        'username': 'mikelcantik',
        'email': 'mikellutu@gmail.com',
        'password': 'mikellutu123'
    })
```

4. response     :

```Typescript
{
    'success' : true,
    'token' : `Bearer initokenjwtyangbisadipakebuathalhalyangharuslogindulu`
    'user': {
        'username': 'mikelcantik',
        'email': 'mikellutu@gmail.com',
        'password': '$2a$10$ef64GmLeqF9yD8Mu8GLMWuv6NcED5qG2HrnbhIRsnEKJRidusdUo.',
        'followers': [],
        'following': [],
        'recipesCreated': [],
        'recipesLiked': [],
        '_id': '67432b32338697f7618f9d90',
        'createdAt': '2024-11-24T13:33:38.014Z',
        "__v": 0
    }
}
```

#### 2. login

rute untuk login

1. HTML method  : 'POST'
2. route        : /api/user/login
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: JSON.stringify({
        'email': 'farrelganen@gmail.com',
        'password': 'passworddek'
    })
```

4. response     :

```Typescript
{
  'success': true,
  'token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTQ5YjFlZjRkM2YyN2ZkYWNlNGQ2NCIsInVzZXJuYW1lIjoicGFsZWwiLCJpYXQiOjE3MzI0NTUzODQsImV4cCI6MTczMjQ1ODk4NH0.-vcaZdWwS8x69M8lo6s6jjHpyxU3MJ2sqknsGcQhOB4',
  'user': {
    'recipesLiked': [],
    '_id': '67149b1ef4d3f27fdace4d64',
    'username': 'palel',
    'email': 'farrelganen@gmail.com',
    'password': '$2a$10$2M3E6ZqusA9ZWQ4Hd9UOQ.s73EltjXEk1ESdxN78KEcHS4l8YEOUq',
    'createdAt': '2024-10-20T05:54:38.870Z',
    '__v': 0,
    'recipesCreated': [
      '672614d5725aff8cfb88b64a',
      '672616aa725aff8cfb88b651',
      '67261997725aff8cfb88b65d',
      '67261aa4725aff8cfb88b665'
    ]
  }
}
```

#### 3. get user profile

rute untuk mendapatkan informasi tentang user

1. HTML method  : 'GET'
2. route        : /api/user/profile/name (ganti name dengan username user)
3. request      : -
4. response     : json profile user (definisi profile dapat dilihat di /server/models/User.js)

#### 4. update user

mengubah properti user di database dengan cara mengoverride data user dengan data user baru, hanya dapat dilakukan oleh pemilik akun

1. HTML method  : 'PUT'
2. route        : /api/user/update
3. request      :

```Typescript
headers: {
    'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenjwthexadesimalyangdidapatsetelahlogin'
    },
body: JSON.stringify({
    'username': 'mikelcantik',
        'email': 'mikellutu@gmail.com'
    })
```

4. response     : json profile user (definisi profile dapat dilihat di /server/models/User.js)

#### 5. change password

mengubah password user di database. hanya dapat dilakukan oleh pemilik akun

1. HTML method  : 'PUT'
2. route        : /api/user/change_password
3. request      :

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenjwthexadesimalyangdidapatsetelahlogin'
    },
body: JSON.stringify({
        'currentPassword': 'mikellutu123',
        'newPassword': 'mikelsayangedu'
    })
```

4. response     :

```Typescript
{
    'message' : 'Password changed succesfully'
}
```

### social

#### 1. like

like sebuah resep

1. HTML method  : 'POST'
2. route        : /api/social/like
3. request      :

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenjwtyangdidapatsetelahlogin'
    },
body: JSON.stringify({
        'recipeId': 'idresep'
    })
```

4. response     :

```Typescript
{
    'message' : 'Liked succesfully'
}
```

#### 2. unlike

unlike sebuah resep

1. HTML method  : 'POST'
2. route        : /api/social/unlike
3. request      :

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenyangdidapatsetelahlogin'
    },
body: JSON.stringify({
        'recipeId': 'idresep'
    })
```

4. response     :

```Typescript
{
    'message' : 'Unliked succesfully'
}
```

#### 3. comment

memberikan komentar pada sebuah resep

1. HTML method  : 'POST'
2. route        : /api/social/comment
3. request      :

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenjwtyangdidapatsetelahlogin'
    },
body: JSON.stringify({
        'recipeId': 'idreseppadadatabase',
        'comment': 'wah resepnya keren banget'
})
```

4. response     :

```Typescript
{
    'message' : 'Comment added succesfully'
}
```

#### 4. follow user

mengikuti user lain

1. HTML method  : 'POST'
2. route        : /api/social/follow
3. request      :

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenyangdidapatsetelahlogin'
    },
body: JSON.stringify({
        'user_id': 'iduserlainyangdifollow'
    })
```

4. response     :

```Typescript
{
    'message' : 'User followed succesfully'
}
```

#### 5. unfollow user

menghentikan mengikuti user lain

1. HTML method  : 'POST'
2. route        : /api/social/unfollow
3. request      :

```Typescript
headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'BEARER tokenyangdidapatsetelahlogin'
    },
body: JSON.stringify({
        'user_id': 'iduserlainyangdifollow'
    })
```

4. response     :

```Typescript
{
    'message' : 'User unfollowed succesfully'
}
```

#### 6. view comment

melihat komentar pada sebuah resep

1. HTML method  : 'GET'
2. route        : /api/social/view_comment
3. request      :

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: JSON.stringify({
        'recipeId': 'idreseppadadatabase'
    })
```

4. response     : json array komentar (definisi komentar dapat dilihat di /server/models/Recipe.js)

#### 7. view followers

melihat pengikut diri sendiri

1. HTML method  : 'GET'
2. route        : /api/social/view_followers
3. request      : -
4. response     : json array pengikut (definisi pengikut dapat dilihat di /server/models/User.js)

#### 8. view following

melihat user yang diikuti diri sendiri

1. HTML method  : 'GET'
2. route        : /api/social/view_following
3. request      : -
4. response     : json array user yang diikuti (definisi user dapat dilihat di /server/models/User.js)
