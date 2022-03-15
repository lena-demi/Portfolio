var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

/* 
testing https://jsonplaceholder.typicode.com
JSONPlaceholder is a free online REST service that you can use whenever you need some fake data.
You can refer to the website for the API documentation and examples.
*/

testCase('/GET post?userId=<Id>&title=<Title>', function(){
      it('1) it should GET post with valid userID and title', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=8&title=enim+unde+ratione+doloribus+quas+enim+ut+sit+sapiente')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
		res.body.forEach(function(item,  i, body) {
			item.should.have.property('userId').eql(8)
		});
		res.body.forEach(function(item,  i, body) {
			item.should.have.property('title').eql('enim unde ratione doloribus quas enim ut sit sapiente')
		});
                //console.log(res.body);
		done();
            });
      });
	it('2) it should GET empty array when userID is omitted', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=&title=beatae+enim+quia+vel')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.eql(0);
		done();
            });
      }); 
	it('3) it should GET empty array when userId is negative', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=-5&title=optio+dolor+molestias+sit')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.eql(0);
		done();
            });
      }); 
	it('4) it should GET empty array when userId=0', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=0&title=optio+dolor+molestias+sit')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.eql(0);
		done();
            });
      });
	it('5) it should GET empty array when title is non-existing (+check for non-Latin letters)', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts?userId=2&title=несуществующее+название+поста')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.eql(0);
		done();
            });
      });
});
