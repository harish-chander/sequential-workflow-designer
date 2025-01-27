import { Dom } from '../core/dom';
import { Icons } from '../core/icons';

export class ControlBarView {
	public static create(parent: HTMLElement, isUndoRedoSupported: boolean): ControlBarView {
		const root = Dom.element('div', {
			class: 'sqd-control-bar'
		});

		const resetButton = createButton(Icons.center, 'Reset');
		root.appendChild(resetButton);

		const zoomInButton = createButton(Icons.zoomIn, 'Zoom in');
		root.appendChild(zoomInButton);

		const zoomOutButton = createButton(Icons.zoomOut, 'Zoom out');
		root.appendChild(zoomOutButton);

		let undoButton: HTMLElement | null = null;
		let redoButton: HTMLElement | null = null;

		if (isUndoRedoSupported) {
			undoButton = createButton(Icons.undo, 'Undo');
			root.appendChild(undoButton);
			redoButton = createButton(Icons.redo, 'Redo');
			root.appendChild(redoButton);
		}

		const moveButton = createButton(Icons.move, 'Turn on/off drag and drop');
		moveButton.classList.add('sqd-disabled');
		root.appendChild(moveButton);

		const deleteButton = createButton(Icons.delete, 'Delete selected step');
		deleteButton.classList.add('sqd-hidden');
		root.appendChild(deleteButton);

		parent.appendChild(root);
		return new ControlBarView(resetButton, zoomInButton, zoomOutButton, undoButton, redoButton, moveButton, deleteButton);
	}

	private constructor(
		private readonly resetButton: HTMLElement,
		private readonly zoomInButton: HTMLElement,
		private readonly zoomOutButton: HTMLElement,
		private readonly undoButton: HTMLElement | null,
		private readonly redoButton: HTMLElement | null,
		private readonly moveButton: HTMLElement,
		private readonly deleteButton: HTMLElement
	) {}

	public bindResetButtonClick(handler: () => void) {
		bindClick(this.resetButton, handler);
	}

	public bindZoomInButtonClick(handler: () => void) {
		bindClick(this.zoomInButton, handler);
	}

	public bindZoomOutButtonClick(handler: () => void) {
		bindClick(this.zoomOutButton, handler);
	}

	public bindUndoButtonClick(handler: () => void) {
		if (!this.undoButton) {
			throw new Error('Undo button is disabled');
		}
		bindClick(this.undoButton, handler);
	}

	public bindRedoButtonClick(handler: () => void) {
		if (!this.redoButton) {
			throw new Error('Redo button is disabled');
		}
		bindClick(this.redoButton, handler);
	}

	public bindMoveButtonClick(handler: () => void) {
		bindClick(this.moveButton, handler);
	}

	public bindDeleteButtonClick(handler: () => void) {
		bindClick(this.deleteButton, handler);
	}

	public setIsDeleteButtonHidden(isHidden: boolean) {
		Dom.toggleClass(this.deleteButton, isHidden, 'sqd-hidden');
	}

	public setIsMoveButtonDisabled(isDisabled: boolean) {
		Dom.toggleClass(this.moveButton, isDisabled, 'sqd-disabled');
	}

	public setUndoButtonDisabled(isDisabled: boolean) {
		if (!this.undoButton) {
			throw new Error('Undo button is disabled');
		}
		Dom.toggleClass(this.undoButton, isDisabled, 'sqd-disabled');
	}

	public setRedoButtonDisabled(isDisabled: boolean) {
		if (!this.redoButton) {
			throw new Error('Redo button is disabled');
		}
		Dom.toggleClass(this.redoButton, isDisabled, 'sqd-disabled');
	}
}

function bindClick(element: HTMLElement, handler: () => void) {
	element.addEventListener(
		'click',
		e => {
			e.preventDefault();
			handler();
		},
		false
	);
}

function createButton(iconContent: string, title: string): HTMLElement {
	const button = Dom.element('div', {
		class: 'sqd-control-bar-button',
		title
	});
	const icon = Icons.create('sqd-control-bar-button-icon', iconContent);
	button.appendChild(icon);
	return button;
}
