# **Dokumentasi API tgs basdat :3**

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

### Murid

#### 1. get list murid

rute untuk mendapatkan list semua murid

1. HTML method  : 'GET'
2. route        : /api/murid/
3. request      : - 
4. response     : json array

#### 2. get murid by id

rute untuk mendapatkan data murid dari id

1. HTML method  : 'GET'
2. route        : /api/murid/n  (n adalah id murid)
3. request      : -
4. response     : json int

#### 3. post murid

rute untuk memasukan murid baru

1. HTML method    : 'POST'
2. route          : /api/murid/
3. request        :
```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 4. put murid

rute untuk update data murid berdasarkan id

1. HTML method  : 'PUT'
2. route        : /api/murid/n  (n adalah id murid)
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 5. delete murid

rute delete murid by id 

1. HTML method  : 'DELETE'
2. route        : /api/murid/n (n adalah id murid)
3. request      :
4. response     : -

### mata_pelajaran

#### 1. get list mata_pelajaran

rute untuk mendapatkan list semua mata_pelajaran

1. HTML method  : 'GET'
2. route        : /api/mataPelajaran/
3. request      : - 
4. response     : json array

#### 2. get mataPelajaran by id

rute untuk mendapatkan data mataPelajaran dari id

1. HTML method  : 'GET'
2. route        : /api/mataPelajaran/n  (n adalah id mataPelajaran)
3. request      : -
4. response     : json aray

#### 3. post murid

rute untuk memasukan mataPelajaran baru

1. HTML method    : 'POST'
2. route          : /api/mataPelajaran/
3. request        :
```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 4. put mataPelajaran

rute untuk update data mataPelajaran berdasarkan id

1. HTML method  : 'PUT'
2. route        : /api/mataPelajaran/n  (n adalah id mataPelajaran)
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 5. delete mataPelajaran

rute delete mataPelajaran by id 

1. HTML method  : 'DELETE'
2. route        : /api/mataPelajaran/n (n adalah id mataPelajaran)
3. request      :
4. response     : -

### Project

#### 1. get list project

rute untuk mendapatkan list semua project

1. HTML method  : 'GET'
2. route        : /api/mataPelajaran/
3. request      : - 
4. response     : json array

#### 2. get mataPelajaran by id

rute untuk mendapatkan data mataPelajaran dari id

1. HTML method  : 'GET'
2. route        : /api/project/n  (n adalah id project)
3. request      : -
4. response     : json array

#### 3. post murid

rute untuk memasukan project baru

1. HTML method    : 'POST'
2. route          : /api/project/
3. request        :
```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 4. put mataPelajaran

rute untuk update data mataPelajaran berdasarkan id

1. HTML method  : 'PUT'
2. route        : /api/project/n  (n adalah id project)
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 5. delete project

rute delete project by id 

1. HTML method  : 'DELETE'
2. route        : /api/project/n (n adalah id project)
3. request      :
4. response     : -

### Chapter

#### 1. get list Chapter

rute untuk mendapatkan list semua Chapter

1. HTML method  : 'GET'
2. route        : /api/Chapter/
3. request      : - 
4. response     : json array

#### 2. get Chapter by id

rute untuk mendapatkan data Chapter dari id

1. HTML method  : 'GET'
2. route        : /api/Chapter/n  (n adalah id Chapter)
3. request      : -
4. response     : json array

#### 3. post Chapter

rute untuk memasukan Chapter baru

1. HTML method    : 'POST'
2. route          : /api/Chapter/
3. request        :
```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 4. put Chapter

rute untuk update data Chapter berdasarkan id

1. HTML method  : 'PUT'
2. route        : /api/Chapter/n  (n adalah id Chapter)
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```
#### 5. put nilaifinal

rute untuk update data Chapter berdasarkan id

1. HTML method  : 'PUT'
2. route        : /api/Chapter/project/n/total-nilai-finalisasi  (n adalah id project)
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 6. delete Chapter

rute delete project by id 

1. HTML method  : 'DELETE'
2. route        : /api/Chapter/n (n adalah id Chapter)
3. request      :
4. response     : -

### Aspek

#### 1. get list aspek

rute untuk mendapatkan list semua aspek

1. HTML method  : 'GET'
2. route        : /api/aspek/
3. request      : - 
4. response     : json array

#### 2. get Chapter by id

rute untuk mendapatkan data aspek dari id

1. HTML method  : 'GET'
2. route        : /api/aspek/n  (n adalah id aspek)
3. request      : -
4. response     : json array

#### 3. post aspek

rute untuk memasukan aspek baru

1. HTML method    : 'POST'
2. route          : /api/aspek/
3. request        :
```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```

#### 4. put aspek

rute untuk update data Chapter berdasarkan id

1. HTML method  : 'PUT'
2. route        : /api/aspek/n  (n adalah id aspek)
3. request      : 

```Typescript
headers: {
        'Content-Type': 'application/json'
    },
body: {
        NIS :
        nama :
        kelas :
    }
```
#### 5. get totalkesalahan

rute untuk update data Chapter berdasarkan id

1. HTML method  : 'GET'
2. route        : /api/aspek/chapter/n/getTotalKesalahan  (n adalah id chapter)
3. request      :

#### 6. put update

rute untuk update data Chapter berdasarkan id

1. HTML method  : 'GET'
2. route        : /api/aspek/chapter/n/getTotalKesalahan  (n adalah id chapter)
3. request      : 

#### 6. delete Chapter

rute delete project by id 

1. HTML method  : 'DELETE'
2. route        : /api/Chapter/n (n adalah id Chapter)
3. request      :
4. response     : -
