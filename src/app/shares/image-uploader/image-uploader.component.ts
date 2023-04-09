import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UploadService } from 'src/app/services/upload.service';
import { alertError } from 'src/app/utils/helpers';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MessageService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ImageUploaderComponent
    }
  ]
})
export class ImageUploaderComponent implements OnInit, ControlValueAccessor {

  @Input() multiple: boolean = true;
  @Input() name: string = 'files';
  public state: string[] = [];
  public albums: IAlbum[] = [];
  onChange = () => {};
  onTouched = () => {};
  public isDisabled: boolean = false;
 
  constructor(
    private uploadService: UploadService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private lighboxService: Lightbox
  ) { }
  
  writeValue(urls: string[]): void {
    this.state = urls;
    this.buildLightbox();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
  }
  
  upload(event: Event): void {
    const files: File[] = Array.from((<HTMLInputElement>event.target).files || []);
    this.clearInputFile(event);
    this.uploadService
      .uploadImages(files)
      .subscribe({
        next: res => {
          this.addImageUrl(res);
        },
        error: (err: HttpErrorResponse) => {
          alertError(this.messageService, err.error);
        }
      });
  }

  clearInputFile(event: Event): void {
    (<HTMLInputElement>event.target).value = "";
  }

  addImageUrl(urls: string[]): void {
    this.state.push(...urls);
    this.buildLightbox();
  }

  buildLightbox(): void {
    this.albums = this.state.map((val, index) => <IAlbum>{
      src: 'http://' + val,
      thumb: index.toString()
    });
    this.cd.detectChanges();
  }

  open(index: number): void {
    const config = {
        centerVertically: true,
        disableScrolling: true
    }
    this.lighboxService.open(this.albums, index, config);
    this.cd.detectChanges();
  }

}
