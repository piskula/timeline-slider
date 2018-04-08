import {async, getTestBed, inject, TestBed} from '@angular/core/testing';
import {ShareTimeService} from './share-time.service';

describe('ShareTimeService', () => {
  let injector: TestBed;
  let service: ShareTimeService;
  // let maxSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareTimeService]
    });

    injector = getTestBed();
    service = injector.get(ShareTimeService);

    // maxSpy = spyOn(service, '').and.callThrough();
  });

  it('should create service', inject([ShareTimeService], (shareTimeService: ShareTimeService) => {
    expect(shareTimeService).toBeTruthy();
  }));

  it ('should update right range when right locked and max change', async(() => {
    service.setMax(1000);
    service.setLockedRight(true);
    service.setRangeChosen([0, 1000]);

    let actualRangeChosen: Number[];
    let actualMax: Number;

    // start watching
    service.getMax()
      .subscribe(max => {
        actualMax = max;
      });
    service.getRangeChosen()
      .subscribe(range => {
        actualRangeChosen = range;
      });

    // control values before
    expect(actualMax).toBe(1000);
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(1000);

    service.setMax(2000);
    // control values after
    expect(actualMax).toBe(2000);
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(2000);
  }));

  it ('should not update right range when not right locked and max change', async(() => {
    service.setMax(1000);
    service.setLockedRight(false);
    service.setRangeChosen([0, 1000]);

    let actualRangeChosen: Number[];
    let actualMax: Number;

    // start watching
    service.getMax()
      .subscribe(max => {
        actualMax = max;
      });
    service.getRangeChosen()
      .subscribe(range => {
        actualRangeChosen = range;
      });

    // control vlaues before
    expect(actualMax).toBe(1000);
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(1000);

    service.setMax(2000);
    // control vlaues after
    expect(actualMax).toBe(2000);
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(1000);
  }));

  it ('should unlock right lock when right value change and is not equal to max', async(() => {
    service.setMax(1000);
    service.setLockedRight(true);
    service.setRangeChosen([0, 1000]);

    let actualRangeChosen: Number[];
    let actualMax: Number;
    let actualRightLocked: Boolean;

    // start watching
    service.getMax()
      .subscribe(max => {
        actualMax = max;
      });
    service.getRangeChosen()
      .subscribe(range => {
        actualRangeChosen = range;
      });
    service.isLockedRight()
      .subscribe(isRightLocked => {
        actualRightLocked = isRightLocked;
      });

    // control vlaues before
    expect(actualMax).toBe(1000);
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(1000);
    expect(actualRightLocked).toBe(true);

    service.setRangeChosen([0, 500]);
    // control vlaues after
    expect(actualRangeChosen[1]).toBe(500);
    expect(actualRightLocked).toBe(false);
  }));

  it ('should not unlock right lock when left chosen value change', async(() => {
    service.setMax(1000);
    service.setLockedRight(true);
    service.setRangeChosen([0, 1000]);

    let actualRangeChosen: Number[];
    let actualMax: Number;
    let actualRightLocked: Boolean;

    // start watching
    service.getMax()
      .subscribe(max => {
        actualMax = max;
      });
    service.getRangeChosen()
      .subscribe(range => {
        actualRangeChosen = range;
      });
    service.isLockedRight()
      .subscribe(isRightLocked => {
        actualRightLocked = isRightLocked;
      });

    // control vlaues before
    expect(actualMax).toBe(1000);
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(1000);
    expect(actualRightLocked).toBe(true);

    service.setRangeChosen([500, 1000]);
    // control vlaues after
    expect(actualRangeChosen[0]).toBe(500);
    expect(actualRightLocked).toBe(true);
  }));

  it ('should unlock left lock when right lock is unlocked', async(() => {
    service.setLockedRight(true);
    service.setLockedLeft(true);

    let actualRightLocked: Boolean;
    let actualLeftLocked: Boolean;

    // start watching
    service.isLockedRight()
      .subscribe(isRightLocked => {
        actualRightLocked = isRightLocked;
      });
    service.isLockedLeft()
      .subscribe(isLeftLocked => {
        actualLeftLocked = isLeftLocked;
      });

    // control vlaues before
    expect(actualRightLocked).toBe(true);
    expect(actualLeftLocked).toBe(true);

    service.setLockedRight(false);
    // control vlaues after
    expect(actualRightLocked).toBe(false);
    expect(actualLeftLocked).toBe(false);
  }));

  it ('should update left range when right locked, left unlocked and max change', async(() => {
    service.setMax(1000);
    service.setLockedRight(true);
    service.setLockedLeft(false);
    service.setRangeChosen([500, 1000]);

    let actualRangeChosen: Number[];
    let actualMax: Number;

    // start watching
    service.getMax()
      .subscribe(max => {
        actualMax = max;
      });
    service.getRangeChosen()
      .subscribe(range => {
        actualRangeChosen = range;
      });

    // control values before
    expect(actualMax).toBe(1000);
    expect(actualRangeChosen[0]).toBe(500);
    expect(actualRangeChosen[1]).toBe(1000);

    service.setMax(1005);
    // control values after
    expect(actualMax).toBe(1005);
    expect(actualRangeChosen[0]).toBe(505);
    expect(actualRangeChosen[1]).toBe(1005);
  }));

  it ('should not update left range when left locked and max change', async(() => {
    service.setMax(1000);
    service.setLockedRight(true);
    service.setLockedLeft(true);
    service.setRangeChosen([500, 1000]);

    let actualRangeChosen: Number[];
    let actualMax: Number;

    // start watching
    service.getMax()
      .subscribe(max => {
        actualMax = max;
      });
    service.getRangeChosen()
      .subscribe(range => {
        actualRangeChosen = range;
      });

    // control values before
    expect(actualMax).toBe(1000);
    expect(actualRangeChosen[0]).toBe(500);
    expect(actualRangeChosen[1]).toBe(1000);

    service.setMax(1005);
    // control values after
    expect(actualMax).toBe(1005);
    expect(actualRangeChosen[0]).toBe(500);
    expect(actualRangeChosen[1]).toBe(1005);
  }));

  it ('should update right range when right lock is performed', async(() => {
    service.setMax(1000);
    service.setLockedRight(false);
    service.setRangeChosen([200, 800]);

    let actualRangeChosen: Number[];
    let actualMax: Number;

    // start watching
    service.getMax()
      .subscribe(max => {
        actualMax = max;
      });
    service.getRangeChosen()
      .subscribe(range => {
        actualRangeChosen = range;
      });

    // control values before
    expect(actualMax).toBe(1000);
    expect(actualRangeChosen[0]).toBe(200);
    expect(actualRangeChosen[1]).toBe(800);

    service.setLockedRight(true);
    // control values after
    expect(actualRangeChosen[0]).toBe(200);
    expect(actualRangeChosen[1]).toBe(1000);
  }));

});
