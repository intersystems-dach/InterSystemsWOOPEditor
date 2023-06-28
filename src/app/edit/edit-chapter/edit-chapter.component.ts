import { Component, HostListener, Input } from '@angular/core';
import { Chapter, Page, UserManger } from 'src/utils/classes';
import { ActivatedRoute, Router } from '@angular/router';
import { ChaptermanagerService } from 'src/app/services/chaptermanager.service';
import { IrisinterfaceService } from 'src/app/services/irisinterface.service';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.sass'],
})
export class EditChapterComponent {
  @Input() chapter!: Chapter;
  currentPage: number = 0;
  preview: boolean = false;
  changes: boolean = false;
  sureDelete: boolean = false;
  editMetaData: boolean = false;
  contentVisible = false;
  chapterName: string = '';
  pageInput: number = 1;

  chapterPassword: string = '';

  public static autoSave: boolean = false;
  public static interval: any;
  constructor(
    private apiService: IrisinterfaceService,
    private router: Router,
    private route: ActivatedRoute,
    private chapterManager: ChaptermanagerService
  ) {}

  ngOnInit(): void {
    let x = this.route.snapshot.paramMap.get('chapterName');
    if (x == null) {
      this.router.navigate(['/']);
      return;
    }
    this.chapterName = x;
    this.chapterManager.init().then(() => {
      this.chapter = this.chapterManager.getChapterByName(
        this.chapterName,
        true
      );
      if (
        UserManger.userLevel == 2 ||
        (UserManger.userLevel == 1 &&
          this.chapter.Author == UserManger.userName)
      ) {
        this.contentVisible = true;
      } else {
        this.router.navigate(['/login']);
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
  }

  showNextPage(): void {
    if (this.currentPage == this.chapter.Pages.length - 1) {
      return;
    }
    this.currentPage++;
    this.pageInput = this.currentPage + 1;
    window.scrollTo({ top: 0 });
  }

  showPrevPage(): void {
    if (this.currentPage == 0) {
      return;
    }
    this.currentPage--;
    this.pageInput = this.currentPage + 1;
    window.scrollTo({ top: 0 });
  }

  addPage(): void {
    this.chapter.Pages.push(new Page('', '', ''));
    this.currentPage = this.chapter.Pages.length - 1;
    window.scrollTo({ top: 0 });
    this.changes = true;
  }

  setSureDelete(value: boolean): void {
    this.sureDelete = value;
  }

  deletePage(value: boolean): void {
    if (value) {
      this.chapter.Pages.splice(this.currentPage, 1);
      this.currentPage = this.currentPage - 1;
      if (this.currentPage < 0) {
        this.currentPage = 0;
      }
      window.scrollTo({ top: 0 });
      this.changes = true;
    }
    this.sureDelete = false;
  }

  @HostListener('document:keydown.control.alt.s', ['$event'])
  save(alertSaved: boolean = true) {
    this.apiService.updateChapter(this.chapter).subscribe({
      next: (data) => {
        if (data.status) {
          if (alertSaved) {
            alert('Chapter saved!');
          }
          this.changes = false;
        } else {
          alert('Error saving chapter!');
        }
      },
      error: (err: any) => {
        alert('Error saving chapter: ' + err.message);
      },
    });
  }

  onChange() {
    this.changes = true;
  }

  togglePreview() {
    this.preview = !this.preview;
    window.scrollTo({ top: 0 });
  }

  toggleAutoSave() {
    EditChapterComponent.autoSave = !EditChapterComponent.autoSave;
    this.setAutoSave();
  }

  toggleEditMetaData() {
    this.editMetaData = !this.editMetaData;
    if (this.editMetaData) {
      console.log(this.chapterName);
      this.apiService
        .getChapterPassword(
          this.chapter.Title,
          UserManger.userName,
          UserManger.password
        )
        .subscribe({
          next: (data) => {
            this.chapterPassword = data.password;
          },
          error: (err: any) => {
            alert('Error getting chapter password: ' + err.message);
            this.chapterPassword = this.chapter.Password;
          },
        });
    }
  }

  getAutoSave() {
    return EditChapterComponent.autoSave;
  }

  setAutoSave() {
    if (EditChapterComponent.autoSave) {
      EditChapterComponent.interval = setInterval(() => {
        this.save(false);
      }, 5000);
    } else {
      clearInterval(EditChapterComponent.interval);
    }
  }

  goBack() {
    if (this.changes) {
      this.save(false);
    }
    clearInterval(EditChapterComponent.interval);
    this.router.navigate(['/']);
  }
}
