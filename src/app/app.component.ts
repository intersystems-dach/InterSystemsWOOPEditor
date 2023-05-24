import { Component } from '@angular/core';
import { Chapter, Config, Page } from 'src/utils/classes';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import config from 'src/assets/chapters/config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'InterSystemsWUI';

  private static baseURL = 'assets/chapters/';

  chapterNames: string[] = config.chapterNames;
  chapters: Chapter[] = [];
  currentChapter: Chapter = new Chapter('Empty', [], new Config('', ''));

  chapterSelected = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    for (let chapterName of this.chapterNames) {
      let chapter = await readChapter(
        this.http,
        AppComponent.baseURL,
        chapterName
      );
      this.chapters.push(chapter);
    }

    for (let chapter of this.chapters) {
      if (window.location.href.includes(chapter.title.replace(' ', '-'))) {
        this.currentChapter = chapter;
        this.chapterSelected = true;
      }
    }
  }

  selectChapter(chapterName: string) {
    this.currentChapter = this.getChapterByName(chapterName);
    this.chapterSelected = true;
  }

  goBack() {
    this.chapterSelected = false;
  }

  getChapterByName(chapterName: string): Chapter {
    for (let chapter of this.chapters) {
      if (chapter.title == chapterName) {
        return chapter;
      }
    }
    return new Chapter('Empty', [], new Config('', ''));
  }
  verifyChapter(value: boolean) {
    if (value) {
      this.currentChapter.verified = true;
    } else {
      this.chapterSelected = false;
    }
  }
}

function readConfigFile(
  http: HttpClient,
  filePath: string
): Promise<Config | undefined> {
  return http
    .get<Config>(filePath)
    .toPromise()
    .then((data) => {
      return data;
    });
}

async function readChapter(http: HttpClient, baseURL: string, name: string) {
  let pages = [];
  let i = 1;
  while (true) {
    let page = await readPage(http, baseURL, name, i);
    if (page == null) {
      break;
    }
    pages.push(page);
    i++;
  }

  let config = await readConfigFile(http, baseURL + name + '/config.json');
  if (config == undefined) {
    console.log('Config file not found');
    config = new Config('', '');
  }

  let chapter = new Chapter(name, pages, config);

  return chapter;
}
async function readPage(
  http: HttpClient,
  baseURL: string,
  chapterName: string,
  pageNumber: number
) {
  let content = baseURL + chapterName + '/' + pageNumber + '/content.md';
  if (!(await fileExists(http, content))) {
    return null;
  }
  let tip = baseURL + chapterName + '/' + pageNumber + '/tip.md';
  if (!(await fileExists(http, tip))) {
    tip = '';
  }
  let result = baseURL + chapterName + '/' + pageNumber + '/result.md';
  if (!(await fileExists(http, result))) {
    result = '';
  }
  return new Page(content, tip, result);
}

/* function fileExists(http: HttpClient, url: string): Observable<boolean> {
  return http.get(url).pipe(
    map((response) => {
      return true;
    }),
    catchError((error) => {
      return false;
    })
  );
} */

function fileExists(
  http: HttpClient,
  filePath: string
): Promise<boolean | undefined> {
  return http
    .head(filePath, { observe: 'response' })
    .pipe(
      map((response) => response.status === 200),
      catchError(() => of(false))
    )
    .toPromise();
}
