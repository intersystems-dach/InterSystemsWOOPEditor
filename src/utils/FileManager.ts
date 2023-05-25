import { HttpClient } from '@angular/common/http';
import { Chapter, Config, Page } from './classes';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export class FileManager {
  private static baseURL = '';
  private static http: HttpClient;

  public static init(http: HttpClient, baseURL: string) {
    FileManager.http = http;
    FileManager.baseURL = baseURL;
  }

  public static async writeNewChapter(chapter: Chapter): Promise<boolean> {
    let config = chapter.config;
    let configPath = FileManager.baseURL + chapter.title + '/config.json';

    // Create config file

    return await FileManager.http
      .post(configPath, config)
      .toPromise()
      .then(() => {
        console.log('Config file created');
        return true;
      })
      .catch((err) => {
        console.log('Config file not created');
        console.log(err);
        return false;
      });

    /* let i = 1;
    for (let page of chapter.pages) {
      let contentPath =
        FileManager.baseURL + chapter.title + '/' + i + '/content.md';
      await FileManager.http
        .put(contentPath, page.)
        .toPromise()
        .then(() => {
          console.log('Content file created');
        })
        .catch((err) => {
          console.log('Content file not created');
          console.log(err);
        });

      let tipPath = FileManager.baseURL + chapter.title + '/' + i + '/tip.md';
      await FileManager.http
        
        .put(tipPath, page.tip)
        .toPromise()
        .then(() => {
          console.log('Tip file created');
        })
        .catch((err) => {
          console.log('Tip file not created');
          console.log(err);
        });

      let resultPath =
        FileManager.baseURL + chapter.title + '/' + i + '/result.md';
      await FileManager.http
        .put(resultPath, page.result)
        .toPromise()
        .then(() => {
          console.log('Result file created');
        })
        .catch((err) => {
          console.log('Result file not created');
          console.log(err);
        });

      i++;
    } */
  }

  public static async readChapter(name: string) {
    let pages = [];
    let i = 1;
    while (true) {
      let page = await FileManager.readPage(name, i);
      if (page == null) {
        break;
      }
      pages.push(page);
      i++;
    }

    let config = await FileManager.readConfigFile(
      FileManager.baseURL + name + '/config.json'
    );
    if (config == undefined) {
      console.log('Config file not found');
      config = new Config('', '', '', '');
    }

    let chapter = new Chapter(name, pages, config);

    return chapter;
  }

  private static readConfigFile(filePath: string): Promise<Config | undefined> {
    return FileManager.http
      .get<Config>(filePath)
      .toPromise()
      .then((data) => {
        return data;
      });
  }

  private static async readPage(chapterName: string, pageNumber: number) {
    let content =
      FileManager.baseURL + chapterName + '/' + pageNumber + '/content.md';
    if (!(await FileManager.fileExists(content))) {
      return null;
    }
    let tip = FileManager.baseURL + chapterName + '/' + pageNumber + '/tip.md';
    if (!(await FileManager.fileExists(tip))) {
      tip = '';
    }
    let result =
      FileManager.baseURL + chapterName + '/' + pageNumber + '/result.md';
    if (!(await FileManager.fileExists(result))) {
      result = '';
    }
    return new Page(content, tip, result);
  }

  private static fileExists(filePath: string): Promise<boolean | undefined> {
    return FileManager.http
      .head(filePath, { observe: 'response' })
      .pipe(
        map((response) => response.status === 200),
        catchError(() => of(false))
      )
      .toPromise();
  }
}
