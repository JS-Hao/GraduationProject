import React from 'react';
import { very } from '../../utils/very-ajax';
import './style.css';
import { markdown } from 'markdown';
import Comment from '../Comment/index';

export default class Answer extends React.Component {
	constructor(props) {
		super(props);
		this.handleClickRemove = this.handleClickRemove.bind(this);
		this.handleClickAgree = this.handleClickAgree.bind(this);
		this.handleClickDisagree = this.handleClickDisagree.bind(this);
		this.handleClickComment = this.handleClickComment.bind(this);
	}

	handleClickRemove(e) {
		let id = e.target.getAttribute('data-id');
		let that = this;

		very.ajax({
			url: '/question/' + this.props.id + '/answer/' + id + '/remove',
			type: 'GET',
			success: function(res) {
				res = JSON.parse(res);
				if (res.code === 200) {
					alert('删除成功！');
					that.props.handleEmit();
				} else if (res.code === -1) {
					alert('您无权限进行此操作！');
				}
			},
			fail: function(err) {
				console.error(err);
				alert('系统错误！');
				window.location.reload();
			}
		})
	}

	handleClickAgree(e) {
		let id = e.target.getAttribute('data-id');
		let that = this;
		let canAgree = e.target.className.split(' ').indexOf('is-canAgree');
		let url = '';

		if (canAgree === -1) {
			url = '/question/' + that.props.id + '/answer/' + id + '/agree';
		} else {
			url = '/question/' + that.props.id + '/answer/' + id + '/cancel/agree';
		}

		very.ajax({
			url: url,
			type: 'GET',
			success: function(res) {
				res = JSON.parse(res);
				if (res.code === 200) {
					alert(res.msg);
					that.props.handleEmit();
				} else if (res.code === -1) {
					alert(res.msg);
				}
			},
			fail: function(err) {
				console.error(err);
			}
		})
	}

	handleClickDisagree(e) {
		let id = e.target.getAttribute('data-id');
		let that = this;
		let canDisagree = e.target.className.split(' ').indexOf('is-canDisagree');
		let url = '';

		if (canDisagree === -1) {
			url = '/question/' + that.props.id + '/answer/' + id + '/disagree';
		} else {
			url = '/question/' + that.props.id + '/answer/' + id + '/cancel/disagree';
		}

		very.ajax({
			url: url,
			type: 'GET',
			success: function(res) {
				res = JSON.parse(res);
				if (res.code === 200) {
					alert(res.msg);
					that.props.handleEmit();
				} else if (res.code === -1) {
					alert(res.msg);
				}
			},
			fail: function(err) {
				console.error(err);
			}
		})
		
	}

	getAgreeClassName(arr, author) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].author === author) {
				return 'r-detail-answer-agreeBtn is-canAgree';
			}
		}
		return 'r-detail-answer-agreeBtn';
	}

	getDisagreeClassName(arr, author) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].author === author) {
				return 'r-detail-answer-disaBtn is-canDisagree';
			}
		}
		return 'r-detail-answer-disaBtn';
	}

	escaped(str) {
		return str.replace(/&quot;|&#34;/g, '\"')
				  .replace(/&#39;|&apos;/g, "\'")	
				  .replace(/&amp;|&#38;/g, '&')
				  .replace(/&lt;|&#60;/g, '<')
				  .replace(/&gt;|&#62;/g, '>')
				  .replace(/&nbsp;|&#160;/g, ' ');
	}

	handleClickComment(e) {
		let id = e.target.getAttribute('data-id');
		if (this['_comment' + id].style.display == 'none') {
			this['_comment' + id].style.display = 'block';
			e.target.innerHTML = '收起评论';
		} else {
			this['_comment' + id].style.display = 'none';
			e.target.innerHTML = '展开评论';
		}
	}

	getRawMarkup(content) {
    	return { __html: markdown.toHTML(this.escaped(content)) };
  	}

	render() {
		let userId = this.props.userinfo.userId;
		return (
			<ul>
				{this.props.data.map((ele, index) => {
					return (
						<li className="r-detail-answer fn-clear" key={index}>
							<div className="r-detail-answer-left">
								<div className="r-detail-answer-agreeBtnBox">
									<button 
										data-id={ele._id}
										className={this.getAgreeClassName(ele.agree, userId)}
										onClick={this.handleClickAgree} >
									</button>
									<i>{ele.agree.length - ele.disagree.length}</i>
									<button 
										data-id={ele._id}
										className={this.getDisagreeClassName(ele.disagree, userId)}
										onClick={this.handleClickDisagree} >
									</button>
								</div>
							</div>
							<div className="r-detail-answer-right">
								<div 
									className="r-detail-answer-content"
									dangerouslySetInnerHTML={this.getRawMarkup(ele.content)} >
								</div>
								<div className="r-detail-answer-dazhuBox fn-clear">
									<a 
										className="r-detail-answer-comment"
										onClick={this.handleClickComment}
										data-id={ele._id} >
										{ele.comments.length + '个评论'}
									</a>
									<a 
										className="r-detail-answer-delete"
										data-id={ele._id}
										onClick={this.handleClickRemove}>
										删除
									</a>
									<div>
										<p className="r-detail-answer-dazhuName">{ele.author.name}</p>
										<p className="r-detail-answer-agree">{ ele.agree.length + '人赞同' }</p>
									</div>
									<img className="r-detail-answer-dazhuPic" src="/public/img/default.jpg"></img>
								</div>
							</div>
							<div style={{display: 'none'}} ref={(c) => this['_comment' + ele._id] = c}>
								<Comment 
									comments={ele.comments} 
									quesId={this.props.id} 
									answerId={ele._id}
									handleEmit={this.props.handleEmit}/>	
							</div>
							
						</li>
					)
				})}
			</ul>
		)
	}
}