! function(e, t) {
	"function" == typeof define && define.amd ? define(["jquery", "moment"], t) : "object" == typeof exports ? module.exports = t(require("jquery"), require("moment")) : e.Calendar = t(jQuery, moment)
}(this, function(e, t) {
	function a(a) {
		var s = this;
		this.calIsOpen = !1, this.presetIsOpen = !1, this.element = a.element || e(".daterange"), this.type = this.element.hasClass("daterange--single") ? "single" : "double", this.selected = null, this.earliest_date = a.earliest_date || new Date("January 1, 1900"), this.latest_date = a.latest_date || new Date("December 31, 2900"), this.end_date = a.end_date || ("double" == this.type ? new Date : null), this.start_date = a.start_date || ("double" == this.type ? new Date(t(this.end_date).subtract(1, "month")) : null), this.current_date = a.current_date || ("single" == this.type ? new Date : null), this.callback = a.callback || this.calendarSetDates, this.calendarHTML(this.type), e(".dr-presets", this.element).click(function() {
			s.presetToggle()
		}), e(".dr-list-item", this.element).click(function() {
			var t = e(".dr-item-aside", this).html().split("–");
			s.start_date = new Date(t[0]), s.end_date = new Date(t[1]), s.calendarSetDates(), s.presetToggle(), s.calendarSaveDates()
		}), e(".dr-date", this.element).on({
			click : function() {
				s.calendarOpen(this)
			},
			keyup : function(e) {
				9 != e.keyCode || s.calIsOpen || s.start_date || s.end_date || s.calendarOpen(this)
			},
			keydown : function(a) {
				if (13 == a.keyCode && (a.preventDefault(), s.calendarCheckDates(), s.calendarSetDates(), s.calendarSaveDates(), s.calendarClose("force")), 27 == a.keyCode && (s.calendarSetDates(), s.calendarClose("force")), 9 == a.keyCode && (e(s.selected).hasClass("dr-date-start") ? (a.preventDefault(), e(".dr-date-end", s.element).trigger("click")) : (s.calendarCheckDates(), s.calendarSaveDates(), s.calendarClose("force"))), 38 == a.keyCode) {
					a.preventDefault();
					var d = "day";
					a.shiftKey && ( d = "week"), a.metaKey && ( d = "month");
					var r = t(s.current_date).subtract(1, d);
					e(this).html(r.format("MMMM D, YYYY")), s.current_date = r._d
				}
				if (40 == a.keyCode) {
					a.preventDefault();
					var d = "day";
					a.shiftKey && ( d = "week"), a.metaKey && ( d = "month");
					var i = t(s.current_date).add(1, d);
					e(this).html(i.format("MMMM D, YYYY")), s.current_date = i._d
				}
			}
		}), e(".dr-month-switcher i", this.element).click(function() {
			var a = e(".dr-month-switcher span", s.element).html(), d = e(".dr-year-switcher span", s.element).html(), r = t(new Date(a + " 1, " + d)).subtract(1, "month"), i = t(new Date(a + " 1, " + d)).add(1, "month").startOf("day");
			e(this).hasClass("dr-left") ? (e(this).parent().find("span").html(r.format("MMMM")), s.calendarOpen(s.selected, r)) : e(this).hasClass("dr-right") && (e(this).parent().find("span").html(i.format("MMMM")), s.calendarOpen(s.selected, i))
		}), e(".dr-year-switcher i", this.element).click(function() {
			var a = e(".dr-month-switcher span", s.element).html(), d = e(".dr-year-switcher span", s.element).html(), r = t(new Date(a + " 1, " + d)).subtract(1, "year"), i = t(new Date(a + " 1, " + d)).add(1, "year").startOf("day");
			e(this).hasClass("dr-left") ? (e(this).parent().find("span").html(r.format("YYYY")), s.calendarOpen(s.selected, r)) : e(this).hasClass("dr-right") && (e(this).parent().find("span").html(i.format("YYYY")), s.calendarOpen(s.selected, i))
		}), e(".dr-dates-dash", this.element).click(function() {
			e(".dr-date-start", s.element).trigger("click")
		}), e(this.element).click(function(t) {
			e("html").one("click", function() {
				s.presetIsOpen && s.presetToggle(), s.calIsOpen && (s.calendarSetDates(), s.calendarClose("force"))
			}), t.stopPropagation()
		}), e(this.element).add(".dr-date", this.element).focus(function(t) {
			e("html").one("click", function() {
				s.calIsOpen && (s.calendarSetDates(), s.calendarClose("force"))
			}), t.stopPropagation()
		})
	}

	function s(e) {
		for (var t = new Array(e), a = 0; e > a; a++)
			t[a] = a;
		return t
	}

	return a.prototype.presetToggle = function() {
		0 == this.presetIsOpen ? (this.presetIsOpen = !0, this.presetCreate()) : this.presetIsOpen && (this.presetIsOpen = !1), 1 == this.calIsOpen && this.calendarClose(), e(".dr-preset-list", this.element).slideToggle(200), e(".dr-input", this.element).toggleClass("active"), e(".dr-presets", this.element).toggleClass("active")
	}, a.prototype.presetCreate = function() {
		var a = this, s = this.latest_date, d = new Date(e(".dr-date-start", a.element).html()), r = new Date(e(".dr-date-end", a.element).html());
		this.start_date = "Invalid Date" == d ? this.start_date : d, this.end_date = "Invalid Date" == r ? this.end_date : r, e(".dr-list-item", this.element).each(function() {
			var d, r = e(this).data("months"), i = t(s).endOf("month").startOf("day"), n = i.isSame(s);
			return n || ( i = t(s).subtract(1, "month").endOf("month").startOf("day")), "number" == typeof r ? ( d = t(s).subtract( n ? r - 1 : r, "month").startOf("month"), 12 == r && ( d = t(s).subtract( n ? 12 : 13, "month").endOf("month").startOf("day"))) : "all" == r ? ( d = t(a.earliest_date), i = t(a.latest_date)) : ( d = t(a.latest_date).subtract(30, "day"), i = t(a.latest_date)), d.isBefore(a.earliest_date) ? e(this).remove() :
			void   e(".dr-item-aside", this).html(d.format("ll") + " – " + i.format("ll"))
		})
	}, a.prototype.calendarSetDates = function() {
		if (e(".dr-date-start", this.element).html(t(this.start_date).format("MMMM D, YYYY")), e(".dr-date-end", this.element).html(t(this.end_date).format("MMMM D, YYYY")), !this.start_date && !this.end_date) {
			var a = e(".dr-date", this.element).html(), s = t(this.current_date).format("MMMM D, YYYY");
			a != s && e(".dr-date", this.element).html(s)
		}
	}, a.prototype.calendarSaveDates = function() {
		return this.callback()
	}, a.prototype.calendarCheckDates = function() {
		var a = /(?!<=\d)(st|nd|rd|th)/, s = e(".dr-date-start", this.element).html(), d = e(".dr-date-end", this.element).html(), r = e(this.selected).html(), i = [], n = [], l = [];
		return s && ( s = s.replace(a, ""), i = s.split(" ")), d && ( d = d.replace(a, ""), n = d.split(" ")), r && ( r = r.replace(a, ""), l = r.split(" ")), 2 == i.length && (i.push(t().format("YYYY")), s = i.join(" ")), 2 == n.length && (n.push(t().format("YYYY")), d = n.join(" ")), 2 == l.length && (l.push(t().format("YYYY")), r = l.join(" ")), s = new Date(s), d = new Date(d), r = new Date(r), t(s).isAfter(d) || t(d).isBefore(s) || t(s).isSame(d) || t(s).isBefore(this.earliest_date) || t(d).isAfter(this.latest_date) ? this.calendarSetDates() : (this.start_date = "Invalid Date" == s ? this.start_date : s, this.end_date = "Invalid Date" == d ? this.end_date : d,
		void (this.current_date = "Invalid Date" == r ? this.current_date : r))
	}, a.prototype.calendarOpen = function(a, d) {
		var r, i = this, n = e(".dr-dates", this.element).innerWidth() - 8;
		this.selected = a || this.selected, 1 == this.presetIsOpen && this.presetToggle(), 1 == this.calIsOpen && this.calendarClose( d ? "switcher" :
		void 0), this.calendarCheckDates(), this.calendarCreate(d), this.calendarSetDates();
		var l = t(d || this.current_date).add(1, "month").startOf("month").startOf("day"), c = t(d || this.current_date).subtract(1, "month").endOf("month"), o = t(d || this.current_date).add(1, "year").startOf("month").startOf("day"), h = t(d || this.current_date).subtract(1, "year").endOf("month");
		e(".dr-month-switcher span", this.element).html(t(d || this.current_date).format("MMMM")), e(".dr-year-switcher span", this.element).html(t(d || this.current_date).format("YYYY")), e(".dr-switcher i", this.element).removeClass("dr-disabled"), l.isAfter(this.latest_date) && e(".dr-month-switcher .dr-right", this.element).addClass("dr-disabled"), c.isBefore(this.earliest_date) && e(".dr-month-switcher .dr-left", this.element).addClass("dr-disabled"), o.isAfter(this.latest_date) && e(".dr-year-switcher .dr-right", this.element).addClass("dr-disabled"), h.isBefore(this.earliest_date) && e(".dr-year-switcher .dr-left", this.element).addClass("dr-disabled"), e(".dr-day", this.element).on({
			mouseenter : function() {
				function a(a) {
					r =
					void 0, s(42).forEach(function(s) {
						var n = d.next().data("date"), l = d.prev().data("date"), c = d.data("date");
						return c ? (l || ( l = c), n || ( n = c), "start" == a && t(n).isSame(i.end_date) ? !1 : "end" == a && t(l).isSame(i.start_date) ? !1 : "start" == a && t(c).isAfter(i.end_date) && ( r = r || t(c).add(6, "day").startOf("day"), s > 5 || ( n ? t(n).isAfter(i.latest_date) : !1)) ? (e(d).addClass("dr-end"), r = t(c), !1) : "end" == a && t(c).isBefore(i.start_date) && ( r = r || t(c).subtract(6, "day"), s > 5 || ( l ? t(l).isBefore(i.earliest_date) : !1)) ? (e(d).addClass("dr-start"), r = t(c), !1) : ("start" == a && ( d = d.next().addClass("dr-maybe")),
						void ("end" == a && ( d = d.prev().addClass("dr-maybe"))))) : !1
					})
				}

				var d = e(this), n = t(i.start_date), l = t(i.end_date), c = t(i.current_date);
				n.isSame(c) && (d.addClass("dr-hover dr-hover-before"), e(".dr-start", i.element).css({
					border : "none",
					"padding-left" : "0.3125rem"
				}), a("start")), l.isSame(c) && (d.addClass("dr-hover dr-hover-after"), e(".dr-end", i.element).css({
					border : "none",
					"padding-right" : "0.3125rem"
				}), a("end")), i.start_date || i.end_date || d.addClass("dr-maybe"), e(".dr-selected", i.element).css("background-color", "transparent")
			},
			mouseleave : function() {
				e(this).hasClass("dr-hover-before dr-end") && e(this).removeClass("dr-end"), e(this).hasClass("dr-hover-after dr-start") && e(this).removeClass("dr-start"), e(this).removeClass("dr-hover dr-hover-before dr-hover-after"), e(".dr-start, .dr-end", i.element).css({
					border : "",
					padding : ""
				}), e(".dr-maybe:not(.dr-current)", i.element).removeClass("dr-start dr-end"), e(".dr-day", i.element).removeClass("dr-maybe"), e(".dr-selected", i.element).css("background-color", "")
			},
			mousedown : function() {
				var a = e(this).data("date"), s = t(a).format("MMMM D, YYYY");
				r && e(".dr-date", i.element).not(i.selected).html(r.format("MMMM D, YYYY")), e(i.selected).html(s), i.calendarOpen(i.selected), e(i.selected).hasClass("dr-date-start") ? e(".dr-date-end", i.element).trigger("click") : (i.calendarSaveDates(), i.calendarClose("force"))
			}
		}), e(".dr-calendar", this.element).css("width", n).slideDown(200), e(".dr-input", this.element).addClass("active"), e(a).addClass("active").focus(), this.calIsOpen = !0
	}, a.prototype.calendarClose = function(t) {
		var a = this;
		return !this.calIsOpen || this.presetIsOpen || "force" == t ? (e(".dr-date", this.element).blur(), e(".dr-calendar", this.element).slideUp(200, function() {
			e(".dr-day", a.element).remove()
		})) : e(".dr-day", this.element).remove(), "switcher" == t ? !1 : (e(".dr-input, .dr-date", this.element).removeClass("active"),
		void (this.calIsOpen = !1))
	}, a.prototype.calendarArray = function(e, a, d, r) {
		var i = this, d = d || e || a, n = t(r || d).startOf("month"), l = t(r || d).endOf("month"), c = {
			start : {
				day : +n.format("d"),
				str : +n.format("D")
			},
			end : {
				day : +l.format("d"),
				str : +l.format("D")
			}
		}, o =
		void 0, h = s(c.start.day).map(function() {
			return
			void 0 == o && ( o = t(n)), o = o.subtract(1, "day"), {
				str : +o.format("D"),
				start : o.isSame(e),
				end : o.isSame(a),
				current : o.isSame(d),
				selected : o.isBetween(e, a),
				date : o.toISOString(),
				outside : o.isBefore(i.earliest_date),
				fade : !0
			}
		}).reverse(), m = 42 - (c.end.str + h.length);
		o =
		void 0;
		var f = s(m).map(function() {
			return
			void 0 == o && ( o = t(l)), o = o.add(1, "day").startOf("day"), {
				str : +o.format("D"),
				start : o.isSame(e),
				end : o.isSame(a),
				current : o.isSame(d),
				selected : o.isBetween(e, a),
				date : o.toISOString(),
				outside : o.isAfter(i.latest_date),
				fade : !0
			}
		});
		o =
		void 0;
		var p = s(c.end.str).map(function() {
			return o =
			void 0 == o ? t(n) : o.add(1, "day").startOf("day"), {
				str : +o.format("D"),
				start : o.isSame(e),
				end : o.isSame(a),
				current : o.isSame(d),
				selected : o.isBetween(e, a),
				date : o.toISOString(),
				outside : o.isBefore(i.earliest_date) || o.isAfter(i.latest_date)
			}
		});
		return h.concat(p, f)
	}, a.prototype.calendarCreate = function(t) {
		var a = this, s = this.calendarArray(this.start_date, this.end_date, this.current_date, t);
		s.forEach(function(t, s) {
			var d = "dr-day";
			t.fade && (d += " dr-fade"), t.start && (d += " dr-start"), t.end && (d += " dr-end"), t.current && (d += " dr-current"), t.selected && (d += " dr-selected"), t.outside && (d += " dr-outside"), e(".dr-day-list", a.element).append('<li class="' + d + '" data-date="' + t.date + '">' + t.str + "</li>")
		})
	}, a.prototype.calendarHTML = function(e) {
		return this.element.append("double" == e ? '<div class="dr-input"><div class="dr-dates"><div class="dr-date dr-date-start" contenteditable>' + t(this.start_date).format("MMMM D, YYYY") + '</div><span class="dr-dates-dash">–</span><div class="dr-date dr-date-end" contenteditable>' + t(this.end_date).format("MMMM D, YYYY") + '</div></div><div class="dr-presets"><span class="dr-preset-bar"></span><span class="dr-preset-bar"></span><span class="dr-preset-bar"></span></div></div><div class="dr-selections"><div class="dr-calendar" style="display: none;"><div class="dr-range-switcher"><div class="dr-switcher dr-month-switcher"><i class="dr-left"></i><span>April</span><i class="dr-right"></i></div><div class="dr-switcher dr-year-switcher"><i class="dr-left"></i><span>2015</span><i class="dr-right"></i></div></div><ul class="dr-days-of-week-list"><li class="dr-day-of-week">S</li><li class="dr-day-of-week">M</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">W</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">F</li><li class="dr-day-of-week">S</li></ul><ul class="dr-day-list"></ul></div><ul class="dr-preset-list" style="display: none;"><li class="dr-list-item" data-months="days">Last 30 days <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="1">Last month <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="3">Last 3 months <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="6">Last 6 months <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="12">Last year <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="all">All time <span class="dr-item-aside"></span></li></ul></div>' : '<div class="dr-input"><div class="dr-dates"><div class="dr-date" contenteditable>' + t(this.current_date).format("MMMM D, YYYY") + '</div></div></div><div class="dr-selections"><div class="dr-calendar" style="display: none;"><div class="dr-range-switcher"><div class="dr-switcher dr-month-switcher"><i class="dr-left"></i><span></span><i class="dr-right"></i></div><div class="dr-switcher dr-year-switcher"><i class="dr-left"></i><span></span><i class="dr-right"></i></div></div><ul class="dr-days-of-week-list"><li class="dr-day-of-week">S</li><li class="dr-day-of-week">M</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">W</li><li class="dr-day-of-week">T</li><li class="dr-day-of-week">F</li><li class="dr-day-of-week">S</li></ul><ul class="dr-day-list"></ul></div></div>')
	}, a
});
