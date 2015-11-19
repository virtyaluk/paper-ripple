/*eslint no-undef: 0, block-scoped-var: 0, no-unused-expressions: 0*/

describe('PaperRipple', function() {
    before(function() {
        this.mockDiv = window.document.createElement('div');
        this.ripple = new PaperRipple();
        this.mockDiv.style.width = '100px';
        this.mockDiv.style.height = '50px';
        this.mockDiv.style.position = 'relative';
        this.mockDiv.style.color = 'red';
        this.mockDiv.appendChild(this.ripple.$);
    });

    it('should be globally available', function() {
        PaperRipple.should.be.a('function');
    });

    it('should be initialized successfully', function() {
        this.ripple.should.exist;
        this.ripple.should.be.an.instanceof(PaperRipple);
    });

    it('should have default options after initialization', function() {
        this.ripple.initialOpacity.should.be.a('number').and.be.equal(0.25);
        this.ripple.opacityDecayVelocity.should.be.a('number').and.be.equal(0.8);
        this.ripple.recenters.should.be.a('boolean').and.be.false;
        this.ripple.center.should.be.a('boolean').and.be.false;
    });

    it('should be initialized with custom config successfully', function() {
        var ripple = new PaperRipple({ initialOpacity: 0.3, recenters: true });

        ripple.initialOpacity.should.be.a('number').and.be.equal(0.3);
        ripple.opacityDecayVelocity.should.be.a('number').and.be.equal(0.8);
        ripple.recenters.should.be.a('boolean').and.be.true;
        ripple.center.should.be.a('boolean').and.be.false;
    });

    it('should be initialized with default-created DOM element if none wasn\'t presented', function() {
        this.ripple.$.should.be.an.instanceOf(HTMLElement);
        this.ripple.$background.should.be.an.instanceOf(HTMLElement);
        this.ripple.$waves.should.be.an.instanceOf(HTMLElement);
    });

    it('should not have waves after initialization', function() {
        this.ripple._waves.should.be.an('array').and.be.empty;
    });

    describe('when `downAction` called', function() {
        before(function() {
            this.ripple.downAction();
        });

        it('should have one wave in animation queue', function() {
            this.ripple._waves.should.be.an('array').and.have.length(1);
        });

        it('should not keep animating', function() {
            this.ripple.shouldKeepAnimating.should.be.a('boolean').and.be.false;
        });

        describe('PaperWave', function() {
            before(function() {
                this.wave = this.ripple._waves[0];
            });

            it('should have default options', function() {
                this.wave.initialOpacity.should.be.a('number').and.be.equal(0.25);
                this.wave.opacityDecayVelocity.should.be.a('number').and.be.equal(0.8);
                this.wave.recenters.should.be.a('boolean').and.be.false;
                this.wave.center.should.be.a('boolean').and.be.false;
            });

            it('should have own DOM representation', function() {
                this.wave.$.should.be.an.instanceOf(HTMLElement);
                this.wave.$wave.should.be.an.instanceOf(HTMLElement);
            });

            it('should be in touchDown state', function() {
                this.wave.isTouchDown.should.be.a('boolean').and.be.true;
            });

            it('should be at max radius, but not opaque', function() {
                this.wave.isMaxRadiusReached.should.be.a('boolean').and.be.true;
                this.wave.isWaveFullyOpaque.should.be.a('boolean').and.be.false;
            });

            it('should indicate completion of animation', function() {
                this.wave.isAnimationComplete.should.be.a('boolean').and.be.true;
            });
        });

        it('should have more waves in the queue after additional calling of `downAction`', function() {
            this.ripple.downAction();
            this.ripple.downAction();

            this.ripple._waves.should.be.an('array').and.have.length(3);
        });
    });

    describe('when `upAction` called', function() {
        before(function() {
            this.ripple.upAction();
        });

        it('should not have any waves in animation queue', function(done) {
            var that = this;

            setTimeout(function() {
                that.ripple._waves.should.be.an('array').and.have.length(0);
                done();
            }, 400);
        });

        it('should not keep animating', function() {
            this.ripple.shouldKeepAnimating.should.be.a('boolean').and.be.false;
        });
    });
});