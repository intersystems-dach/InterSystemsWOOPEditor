import { Component, Input } from '@angular/core';
import { Chapter, UserManger, VerifyCache } from 'src/utils/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { ChaptermanagerService } from '../services/chaptermanager.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent {
  @Input() chapter!: Chapter;
  @Input() currentPage: number = 0;

  chapterName: string = '';
  hintVisible: boolean = false;
  resultVisible: boolean = false;
  exportOptionsVisible = false;
  contentVisible = true;
  pageInput: number = 1;
  showTOC: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chapterManger: ChaptermanagerService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let x = this.route.snapshot.paramMap.get('chapterName');

    if (x == null) {
      this.router.navigate(['/']);
      return;
    }

    this.chapterName = x;
    this.chapterManger.init().then(() => {
      let heading = undefined;
      if (this.chapterName.includes('~')) {
        heading = this.chapterName.split('~')[1].toLowerCase();
        this.chapterName = this.chapterName.split('~')[0];
      }
      this.chapter = this.chapterManger.getChapterByName(
        this.chapterName,
        true
      ) as Chapter;

      if (!this.chapter.IsPrivate) {
        if (
          UserManger.userLevel == 2 ||
          (UserManger.userLevel == 1 &&
            this.chapter.Author == UserManger.userName)
        ) {
          VerifyCache.verifyChapter(this.chapter.Title, '', false);
        }

        this.contentVisible = VerifyCache.isChapterVerified(this.chapter.Title);
      } else {
        if (
          UserManger.userLevel == 2 ||
          (UserManger.userLevel == 1 &&
            this.chapter.Author == UserManger.userName)
        ) {
          this.contentVisible = true;
        } else {
          this.router.navigate(['/login']);
        }
      }
      let pageLocalStorage = this.localStorageService.getPageForChapter(
        this.chapterName
      );
      if (pageLocalStorage < 0) {
        pageLocalStorage = 0;
      }
      if (pageLocalStorage > this.chapter.Pages.length - 1) {
        pageLocalStorage = this.chapter.Pages.length - 1;
      }
      this.currentPage = pageLocalStorage;
      this.pageInput = this.currentPage + 1;
      if (heading != undefined) {
        let headingPage = Chapter.getChapterPageForHeading(
          this.chapter,
          heading,
          true
        );
        if (headingPage != -1) {
          this.currentPage = headingPage;
          this.pageInput = this.currentPage + 1;
        }
      }
    });
  }

  onPageInput() {
    if (this.pageInput < 1) {
      this.pageInput = 1;
      return;
    }
    if (this.pageInput > this.chapter.Pages.length) {
      this.pageInput = this.chapter.Pages.length;
      return;
    }
    this.currentPage = this.pageInput - 1;
    this.localStorageService.setPageForChapter(
      this.chapterName,
      this.currentPage
    );
  }

  verifyChapter(event: string) {
    if (event == undefined) {
      this.router.navigate(['/']);
      return;
    }
    VerifyCache.verifyChapter(this.chapter.Title, event);
    this.contentVisible = true;
  }

  showNextPage(): void {
    if (this.currentPage == this.chapter.Pages.length - 1) {
      return;
    }
    this.currentPage++;
    this.pageInput = this.currentPage + 1;
    this.hintVisible = false;
    this.resultVisible = false;
    window.scrollTo({ top: 0 });
    this.localStorageService.setPageForChapter(
      this.chapterName,
      this.currentPage
    );
  }

  showPrevPage(): void {
    if (this.currentPage == 0) {
      return;
    }
    this.currentPage--;
    this.pageInput = this.currentPage + 1;
    this.hintVisible = false;
    this.resultVisible = false;
    window.scrollTo({ top: 0 });
    this.localStorageService.setPageForChapter(
      this.chapterName,
      this.currentPage
    );
  }

  showhint() {
    this.hintVisible = true;
  }

  showResult() {
    this.resultVisible = true;
  }

  setTOC(event: boolean) {
    this.showTOC = event;
  }

  onTOCInput(event: number) {
    if (event == -1) {
      this.showTOC = false;
      return;
    }
    this.currentPage = event;
    this.pageInput = this.currentPage + 1;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
