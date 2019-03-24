import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {Board} from '@core/models/Board';
import {BoardColor} from '@core/models/BoardColor';
import {BOARD_COLORS} from '@pages/new-board/boardColors';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss'],
})
export class BoardEditComponent implements OnInit {
  colors: BoardColor[] = BOARD_COLORS;
  boardForm: FormGroup;
  selectedColor: string;
  @Input() board: Board;

  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.selectedColor = this.getColor(this.board.color);
    this.boardForm = this.createForm({
      title: this.board.title,
      color: this.board.color,
      description: this.board.description,
      startDate: this.board.startDate
    });
  }

  private createForm(model: Board): FormGroup {
    return this.formBuilder.group(model);
  }

  private updateForm(model: Partial<Board>): void {
    this.boardForm.patchValue(model)
  }

  private async submitBoard(): Promise<void> {
    await this.modalController.dismiss(this.boardForm.value);
  }
  onSelectChange(ev: CustomEvent): void {
    this.selectedColor = this.getColor(ev.detail.value);
  }

  private getColor(value: string): string {
    const index = this.colors.findIndex(x => x.value === value);
    if (index !== -1) {
      this.selectedColor = value;
      return this.colors[index].hex;
    }
    return '#3880ff';
  }

  async dismissBoardModal(): Promise<void> {
    await this.modalController.dismiss();
  }
}
