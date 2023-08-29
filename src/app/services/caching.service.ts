import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// const TTL = 43200;
const TTL = 600;
const CACHE_KEY = 'api-cached-'

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  constructor(private storage: Storage) { }

  async initStorage() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
  }

  cacheRequests(url, data){
    const validUntil = (new Date().getTime()) + TTL * 1000;
    url = `${url}`;
    return this.storage.set(url, { validUntil, data })
  }

  async getCachedRequest(url){
    const currentTime = new Date().getTime();
    const storedValue = await this.storage.get(url);
    if(!storedValue || storedValue === null){
      return null;
    } else if(storedValue.validUntil < currentTime){
      await this.storage.remove(url);
      return null;
    } else {
      return storedValue.data;
    }
  }

  async clearCachedData(){
    const keys = await this.storage.keys();

    keys.map(async key => {
      if (key.startsWith(CACHE_KEY)){
        await this.storage.remove(key);
      }
    })
  }

  async clearAllCachedData(){
    await this.storage.clear();
  }

  async invalidCacheEntry(url) {
    url = `${url}`;
    await this.storage.remove(url);
  }
}
