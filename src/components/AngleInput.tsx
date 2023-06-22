// Copyright (c) 2016, Chris Andrejewski

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.

// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


import React from "react";

import "./AngleInput.scss";


function getCenter(element: Element): { x: number, y: number } {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}


function getAngle(
    vector: { x: number, y: number }, origin: { x: number, y: number }
): number {
    const theta = Math.atan2(vector.y - origin.y, vector.x - origin.x)
    return (theta * 180 / Math.PI) % 360;
}


class Body {
    angle: number;
    setAngle: (angle: number) => void;
    diskCenter: { x: number, y: number };
    body: HTMLBodyElement;
    acceptKeyboardInput: boolean;
    tracking: boolean;

    constructor(
        angle: number,
        setAngle: (angle: number) => void,
        diskCenter: { x: number, y: number } = { x: 0, y: 0 }
    ) {
        this.angle = angle;  // TODO: as reference, not value
        this.setAngle = setAngle;
        this.diskCenter = diskCenter;
        this.body = document.body as HTMLBodyElement;
        this.acceptKeyboardInput = false;
        this.tracking = false;
    }

    setDiskCenter(diskCenter: { x: number, y: number }) {
        this.diskCenter = diskCenter;
    }

    // startAcceptKeyboardInput() {
    //     this.acceptKeyboardInput = true;
    //     this.body.addEventListener("keydown", this.handleKeyDown, false);
    // }

    // stopAcceptKeyboardInput() {
    //     this.acceptKeyboardInput = false;
    //     this.body.removeEventListener("keydown", this.handleKeyDown, false);
    // }

    // handleKeyDown = (e: KeyboardEvent) => {
    //     if (!this.acceptKeyboardInput) { return }
    //     console.log(this.angle, this.setAngle)

    //     const LEFT_ARROW = "ArrowLeft";
    //     const UP_ARROW = "ArrowUp";
    //     const RIGHT_ARROW = "ArrowRight";
    //     const DOWN_ARROW = "ArrowDown";

    //     switch (e.code) {
    //         case LEFT_ARROW:
    //         case DOWN_ARROW:
    //             e.preventDefault();
    //             // console.log((this.angle - 1) % 360)
    //             this.setAngle((this.angle - 1) % 360);
    //             // this.setAngle((current: number) => (current - 1) % 360);
    //             break;
    //         case UP_ARROW:
    //         case RIGHT_ARROW:
    //             e.preventDefault();
    //             this.setAngle((this.angle + 1) % 360);
    //             // this.setAngle((current: number) => (current + 1) % 360);
    //             break;
    //     }
    // }

    startTracking() {
        this.tracking = true;
        this.body.addEventListener("mousemove", this.handleMouseMove, false);
        this.body.addEventListener("mouseup", this.handleMouseUp, false);
    }

    stopTracking() {
        this.tracking = false;
        this.body.removeEventListener("mousemove", this.handleMouseMove, false);
        this.body.removeEventListener("mouseup", this.handleMouseUp, false);
    }

    handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        this.updateAngle(e);
    }

    handleMouseUp = (e: MouseEvent) => {
        this.updateAngle(e);
        this.stopTracking();
    }


    updateAngle(e: MouseEvent) {
        const newAngle = getAngle({ x: e.clientX, y: e.clientY }, this.diskCenter);
        this.setAngle(-newAngle);
    }
}


/**
 * This implementation is modified version of https://github.com/andrejewski/angle-input/blob/master/react.js
 */
function AngleInput(props:
    { value: number, setValue: (value: number) => void }
    & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value">
): JSX.Element {
    const { value, setValue, ...attrs } = props;

    const body = new Body(value, setValue);

    function handleFocus(e: React.FocusEvent<HTMLDivElement>) {
        body.setDiskCenter(getCenter(e.currentTarget))
        // body.startAcceptKeyboardInput();
    }

    function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
        body.setDiskCenter(getCenter(e.currentTarget))
        // body.stopAcceptKeyboardInput();
    }

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        body.setDiskCenter(getCenter(e.currentTarget))
        body.startTracking();
    }

    return (
        <div
            className="angle-input"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseDown={handleMouseDown}
            tabIndex={0}
        >
            <input type="number" value={value} {...attrs} tabIndex={-1} />
            <span
                className="pivot"
                style={{ transform: `rotate(${-value + 90}deg)` }}
            ></span>
        </div>
    )
}


export default AngleInput;
