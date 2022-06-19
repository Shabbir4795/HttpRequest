import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PostModel } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { id:string; title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http.post('https://httprequestproject-4a8dd-default-rtdb.firebaseio.com/posts.json', postData ).subscribe(responseData => {
      console.log(responseData);
    })
    this.fetchPost();
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
    return this.http.delete('https://httprequestproject-4a8dd-default-rtdb.firebaseio.com/posts.json').subscribe(() => {
      this.loadedPosts = [];
    });
  }

  private fetchPost() {
    this.http.get<{[key: string]: PostModel}>('https://httprequestproject-4a8dd-default-rtdb.firebaseio.com/posts.json')
      .pipe(map(responseData => {
      const postArray: PostModel[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postArray.push({...responseData[key], id: key});
        }
      };
      this.loadedPosts = postArray;
      return postArray;
    })).
      subscribe(fetchData => {
      console.log(fetchData);
    });
  }
}
