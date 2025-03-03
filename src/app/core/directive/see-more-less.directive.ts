import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSeeMoreLess]'
})
export class SeeMoreLessDirective {
  @Input() maxLength: number = 100; // Default maximum length
  private fullText: string = ''; // Stores the full original text of the element.
  private isExpanded: boolean = false; // Tracks whether the text is currently expanded.
  private textSpan!: HTMLSpanElement; // Span element to hold the text content.
  private button!: HTMLButtonElement; // Button element to toggle between "See More" and "See Less".

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.fullText = this.el.nativeElement.textContent.trim(); // Get original text

    if (this.fullText.length > this.maxLength) {
      this.setupTextDisplay();
      this.createToggleButton();
    }
  }

  /**
   * Truncates the text and wraps it in a span element.
   * Replaces the original text content with the truncated version.
   */
  private setupTextDisplay() {
    this.textSpan = this.renderer.createElement('span');
    this.renderer.appendChild(this.textSpan, this.renderer.createText(this.getTruncatedText()));

    this.el.nativeElement.innerHTML = ''; // Clear original text
    this.renderer.appendChild(this.el.nativeElement, this.textSpan); // Append text span
  }

  /**
   * Creates a toggle button for expanding and collapsing the text.
   * Adds styling and event listener for click actions.
   */
  private createToggleButton() {
    this.button = this.renderer.createElement('button');
    this.button.textContent = 'See More';

    // Apply styles for the button
    this.renderer.setStyle(this.button, 'color', 'blue');
    this.renderer.setStyle(this.button, 'border', 'none');
    this.renderer.setStyle(this.button, 'background', 'none');
    this.renderer.setStyle(this.button, 'cursor', 'pointer');
    this.renderer.setStyle(this.button, 'margin-left', '5px');

    // Add click event listener
    this.renderer.listen(this.button, 'click', () => this.toggleText());

    this.renderer.appendChild(this.el.nativeElement, this.button);
  }

  /**
   * Returns the truncated text with an ellipsis (`...`).
   * Ensures that the truncated version does not exceed the maxLength.
   */
  private getTruncatedText() {
    return this.fullText.slice(0, this.maxLength) + '...';
  }

  /**
   * Toggles between the truncated and full text.
   * Updates the button text accordingly.
   */
  private toggleText() {
    this.isExpanded = !this.isExpanded;
    this.textSpan.textContent = this.isExpanded ? this.fullText : this.getTruncatedText();
    this.button.textContent = this.isExpanded ? 'See Less' : 'See More';
  }
}
