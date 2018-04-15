import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { ShareTimeService } from './share-time.service';

describe('ShareTimeService', () => {
  let injector: TestBed;
  let service: ShareTimeService;

  let setRangeChosen: jasmine.Spy;
  let setLockedRight: jasmine.Spy;
  let setLockedLeft: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareTimeService]
    });

    injector = getTestBed();
    service = injector.get(ShareTimeService);

    service.setMin(0);
    service.setMax(1000);
  });

  beforeEach(() => {
    setRangeChosen = spyOn(service, 'setRangeChosen').and.callThrough();
    setLockedRight = spyOn(service, 'setLockedRight').and.callThrough();
    setLockedLeft = spyOn(service, 'setLockedLeft').and.callThrough();
  });

  it('should create service', inject([ShareTimeService], (shareTimeService: ShareTimeService) => {
    expect(shareTimeService).toBeTruthy();
  }));

  it ('01 should update right range when right locked and max change', async(() => {
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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    service.setMax(2000);
    // control values after
    expect(actualMax).toBe(2000);
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(2000);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(1);
    expect(setLockedRight.calls.count()).toBe(0);
  }));

  it ('02 should not update right range when not right locked and max change', async(() => {
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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    service.setMax(2000);
    // control values after
    expect(actualMax).toBe(2000);
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(1000);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(0);
    expect(setLockedRight.calls.count()).toBe(0);
  }));

  it ('03 should unlock right lock when right value change and is not equal to max', async(() => {
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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    service.setRangeChosen([0, 500]);
    // control vlaues after
    expect(actualRangeChosen[1]).toBe(500);
    expect(actualRightLocked).toBe(false);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(1);
    expect(setLockedRight.calls.count()).toBe(1);
  }));

  it ('04 should not unlock right lock when left chosen value change', async(() => {
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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    service.setRangeChosen([500, 1000]);
    // control values after
    expect(actualRangeChosen[0]).toBe(500);
    expect(actualRightLocked).toBe(true);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(1);
    expect(setLockedRight.calls.count()).toBe(0);
  }));

  it ('05 should unlock left lock when right lock is unlocked', async(() => {
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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    setLockedLeft.calls.reset();
    service.setLockedRight(false);
    // control values after
    expect(actualRightLocked).toBe(false);
    expect(actualLeftLocked).toBe(false);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(0);
    expect(setLockedRight.calls.count()).toBe(1);
    expect(setLockedLeft.calls.count()).toBe(1);
  }));

  it ('06 should update left range when right locked, left unlocked and max change', async(() => {
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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    setLockedLeft.calls.reset();
    service.setMax(1005);
    // control values after
    expect(actualMax).toBe(1005);
    expect(actualRangeChosen[0]).toBe(505);
    expect(actualRangeChosen[1]).toBe(1005);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(1);
    expect(setLockedRight.calls.count()).toBe(0);
    expect(setLockedLeft.calls.count()).toBe(0);
  }));

  it ('07 should not update left range when left locked and max change', async(() => {
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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    setLockedLeft.calls.reset();
    service.setMax(1005);
    // control values after
    expect(actualMax).toBe(1005);
    expect(actualRangeChosen[0]).toBe(500);
    expect(actualRangeChosen[1]).toBe(1005);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(1);
    expect(setLockedRight.calls.count()).toBe(0);
    expect(setLockedLeft.calls.count()).toBe(0);
  }));

  it ('08 should update right range when right lock is performed', async(() => {
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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    service.setLockedRight(true);
    // control values after
    expect(actualRangeChosen[0]).toBe(200);
    expect(actualRangeChosen[1]).toBe(1000);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(1);
    expect(setLockedRight.calls.count()).toBe(1);
  }));

  it ('09 should fit chosen range inside interval, when wrong data come', async(() => {
    service.setLockedRight(false);
    service.setRangeChosen([400, 800]);

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

    setRangeChosen.calls.reset();
    setLockedRight.calls.reset();
    service.setMax(200);
    // control values after
    expect(actualRangeChosen[0]).toBe(0);
    expect(actualRangeChosen[1]).toBe(200);
    // control multiple calls
    expect(setRangeChosen.calls.count()).toBe(1);
    expect(setLockedRight.calls.count()).toBe(0);
  }));

});
