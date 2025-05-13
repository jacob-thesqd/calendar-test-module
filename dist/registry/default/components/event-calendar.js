"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { addDays, format, getDay, isSameDay, startOfWeek } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Pencil, Plus, } from "lucide-react";
// This is a stub implementation to satisfy the component's dependencies
var utils = {
    cn: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.join(" ");
    }
};
// Mock UI components
var UIButton = function (props) { return _jsx("button", __assign({}, props, { children: props.children })); };
var UICalendar = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDialog = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDialogClose = function (props) { return _jsx("button", __assign({}, props, { children: props.children })); };
var UIDialogContent = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDialogDescription = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDialogFooter = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDialogHeader = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDialogTitle = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDropdownMenu = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDropdownMenuContent = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDropdownMenuItem = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIDropdownMenuTrigger = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIInput = function (props) { return _jsx("input", __assign({}, props)); };
var UILabel = function (props) { return _jsx("label", __assign({}, props, { children: props.children })); };
var UIPopover = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIPopoverContent = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UIPopoverTrigger = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UISelect = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UISelectContent = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UISelectItem = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UISelectTrigger = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UISelectValue = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UITextarea = function (props) { return _jsx("textarea", __assign({}, props)); };
var UITooltip = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UITooltipContent = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var UITooltipTrigger = function (props) { return _jsx("div", __assign({}, props, { children: props.children })); };
var colorMap = {
    sky: "bg-sky-100 text-sky-700 hover:bg-sky-200 hover:text-sky-800 border-sky-500 dark:bg-sky-800/30 dark:text-sky-300 dark:hover:bg-sky-800/40 dark:hover:text-sky-300 dark:border-sky-300/60",
    emerald: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800 border-emerald-500 dark:bg-emerald-800/30 dark:text-emerald-300 dark:hover:bg-emerald-800/40 dark:hover:text-emerald-300 dark:border-emerald-300/60",
    violet: "bg-violet-100 text-violet-700 hover:bg-violet-200 hover:text-violet-800 border-violet-500 dark:bg-violet-800/30 dark:text-violet-300 dark:hover:bg-violet-800/40 dark:hover:text-violet-300 dark:border-violet-300/60",
    amber: "bg-amber-100 text-amber-700 hover:bg-amber-200 hover:text-amber-800 border-amber-500 dark:bg-amber-800/30 dark:text-amber-300 dark:hover:bg-amber-800/40 dark:hover:text-amber-300 dark:border-amber-300/60",
    rose: "bg-rose-100 text-rose-700 hover:bg-rose-200 hover:text-rose-800 border-rose-500 dark:bg-rose-800/30 dark:text-rose-300 dark:hover:bg-rose-800/40 dark:hover:text-rose-300 dark:border-rose-300/60",
    slate: "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-800 border-slate-500 dark:bg-slate-800/30 dark:text-slate-300 dark:hover:bg-slate-800/40 dark:hover:text-slate-300 dark:border-slate-300/60",
    orange: "bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-800 border-orange-500 dark:bg-orange-800/30 dark:text-orange-300 dark:hover:bg-orange-800/40 dark:hover:text-orange-300 dark:border-orange-300/60",
};
function EventCell(_a) {
    var event = _a.event, openEventDialog = _a.openEventDialog;
    var selectedColor = event.color || "slate";
    var colorClass = colorMap[selectedColor];
    return (_jsxs("button", { className: utils.cn("relative w-full h-auto py-1 px-2 rounded-md flex flex-col text-left border-l-4", colorClass), onClick: function () { return openEventDialog(event); }, children: [_jsx("div", { className: "flex justify-between items-center gap-1", children: _jsx("span", { className: "font-medium truncate group-hover:text-primary", children: event.title }) }), event.location && (_jsxs("div", { className: "flex items-center text-xs gap-1 opacity-80", children: [_jsx(MapPin, { className: "h-3 w-3" }), _jsx("span", { className: "truncate", children: event.location })] }))] }));
}
export function EventCalendar(_a) {
    var events = _a.events, onEventAdd = _a.onEventAdd, onEventUpdate = _a.onEventUpdate, onEventDelete = _a.onEventDelete;
    var _b = React.useState(new Date()), date = _b[0], setDate = _b[1];
    var _c = React.useState(false), showDatePicker = _c[0], setShowDatePicker = _c[1];
    var _d = React.useState(null), dialogEvent = _d[0], setDialogEvent = _d[1];
    var _e = React.useState("month"), view = _e[0], setView = _e[1];
    var dayEvents = React.useMemo(function () {
        if (view !== "day" || !date)
            return [];
        return events.filter(function (event) { return isSameDay(event.start, date); });
    }, [events, date, view]);
    var eventsByDate = React.useMemo(function () {
        var eventMap = {};
        events.forEach(function (event) {
            var dateKey = format(event.start, "yyyy-MM-dd");
            if (!eventMap[dateKey]) {
                eventMap[dateKey] = [];
            }
            eventMap[dateKey].push(event);
        });
        return eventMap;
    }, [events]);
    var generateDatesForMonth = React.useCallback(function (year, month) {
        var firstDay = new Date(year, month, 1);
        var firstDayOfWeek = startOfWeek(firstDay, { weekStartsOn: 0 });
        var result = [];
        // Include days from previous month to fill the first week
        for (var i = 0; i < getDay(firstDay); i++) {
            var prevMonthDay = addDays(firstDayOfWeek, i);
            result.push(prevMonthDay);
        }
        // Add all days in the current month
        var currentDate = firstDay;
        while (currentDate.getMonth() === month) {
            result.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }
        // Fill the last week with days from the next month
        var lastDay = addDays(currentDate, -1);
        var daysToAdd = 6 - getDay(lastDay);
        for (var i = 1; i <= daysToAdd; i++) {
            var nextMonthDay = addDays(lastDay, i);
            result.push(nextMonthDay);
        }
        return result;
    }, []);
    var daysInMonth = React.useMemo(function () {
        return generateDatesForMonth(date.getFullYear(), date.getMonth());
    }, [date, generateDatesForMonth]);
    var handleNewEvent = React.useCallback(function () {
        var newEvent = {
            id: "new-".concat(Date.now()),
            title: "",
            start: date,
            end: date,
            isNew: true,
            color: "sky",
        };
        setDialogEvent(newEvent);
    }, [date]);
    var handleSaveEvent = function () {
        if (!dialogEvent)
            return;
        var isNew = dialogEvent.isNew, eventData = __rest(dialogEvent, ["isNew"]);
        if (isNew && onEventAdd) {
            onEventAdd(eventData);
        }
        else if (!isNew && onEventUpdate) {
            onEventUpdate(eventData);
        }
        setDialogEvent(null);
    };
    var handleDeleteEvent = function () {
        if (!dialogEvent || !onEventDelete)
            return;
        onEventDelete(dialogEvent.id);
        setDialogEvent(null);
    };
    var openEventDialog = function (event) {
        setDialogEvent(__assign(__assign({}, event), { isNew: false }));
    };
    return (_jsxs("div", { className: "rounded-xl border bg-white shadow-sm dark:bg-zinc-950 dark:border-zinc-800", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b p-4 dark:border-zinc-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(UIButton, { variant: "outline", className: "h-8", onClick: function () {
                                    var newDate = new Date(date);
                                    if (view === "month") {
                                        newDate.setMonth(newDate.getMonth() - 1);
                                    }
                                    else if (view === "week") {
                                        newDate.setDate(newDate.getDate() - 7);
                                    }
                                    else {
                                        newDate.setDate(newDate.getDate() - 1);
                                    }
                                    setDate(newDate);
                                }, children: [_jsx(ChevronLeftIcon, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Previous" })] }), _jsxs(UIPopover, { open: showDatePicker, onOpenChange: setShowDatePicker, children: [_jsx(UIPopoverTrigger, { asChild: true, children: _jsxs(UIButton, { variant: "outline", className: "h-8", children: [_jsx(CalendarIcon, { className: "h-4 w-4 mr-2" }), format(date, view === "day" ? "d MMMM yyyy" : view === "week" ? "MMMM yyyy" : "MMMM yyyy")] }) }), _jsx(UIPopoverContent, { align: "start", className: "w-auto p-0", children: _jsx(UICalendar, { mode: "single", selected: date, onSelect: function (date) {
                                                if (date) {
                                                    setDate(date);
                                                    setShowDatePicker(false);
                                                }
                                            }, initialFocus: true }) })] }), _jsxs(UIButton, { variant: "outline", className: "h-8", onClick: function () {
                                    var newDate = new Date(date);
                                    if (view === "month") {
                                        newDate.setMonth(newDate.getMonth() + 1);
                                    }
                                    else if (view === "week") {
                                        newDate.setDate(newDate.getDate() + 7);
                                    }
                                    else {
                                        newDate.setDate(newDate.getDate() + 1);
                                    }
                                    setDate(newDate);
                                }, children: [_jsx(ChevronRightIcon, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Next" })] }), _jsx(UIButton, { variant: "outline", className: "h-8", onClick: function () { return setDate(new Date()); }, children: "Today" })] }), _jsxs("div", { className: "flex w-full sm:w-auto items-center gap-2", children: [_jsx(UIButton, { variant: view === "day" ? "default" : "outline", className: "h-8", onClick: function () { return setView("day"); }, children: "Day" }), _jsx(UIButton, { variant: view === "week" ? "default" : "outline", className: "h-8", onClick: function () { return setView("week"); }, children: "Week" }), _jsx(UIButton, { variant: view === "month" ? "default" : "outline", className: "h-8", onClick: function () { return setView("month"); }, children: "Month" }), _jsxs(UIButton, { className: "h-8 ml-auto sm:ml-2", onClick: handleNewEvent, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Event"] })] })] }), view === "month" && (_jsxs("div", { className: "grid grid-cols-7 text-sm", children: [_jsx("div", { className: "border-b py-2 text-center font-medium dark:border-zinc-800", children: "Sun" }), _jsx("div", { className: "border-b py-2 text-center font-medium dark:border-zinc-800", children: "Mon" }), _jsx("div", { className: "border-b py-2 text-center font-medium dark:border-zinc-800", children: "Tue" }), _jsx("div", { className: "border-b py-2 text-center font-medium dark:border-zinc-800", children: "Wed" }), _jsx("div", { className: "border-b py-2 text-center font-medium dark:border-zinc-800", children: "Thu" }), _jsx("div", { className: "border-b py-2 text-center font-medium dark:border-zinc-800", children: "Fri" }), _jsx("div", { className: "border-b py-2 text-center font-medium dark:border-zinc-800", children: "Sat" }), daysInMonth.map(function (day, index) {
                        var dateString = format(day, "yyyy-MM-dd");
                        var isToday = isSameDay(day, new Date());
                        var isCurrentMonth = day.getMonth() === date.getMonth();
                        var dayEvents = eventsByDate[dateString] || [];
                        return (_jsxs("div", { className: utils.cn("border-b border-r p-2 min-h-[120px] dark:border-zinc-800", !isCurrentMonth && "bg-muted/30"), children: [_jsx("div", { className: utils.cn("flex items-center justify-center w-7 h-7 rounded-full mx-auto mb-1", isToday && "bg-primary text-primary-foreground font-medium"), children: format(day, "d") }), _jsxs("div", { className: "space-y-1", children: [dayEvents.slice(0, 3).map(function (event) { return (_jsx(EventCell, { event: event, openEventDialog: openEventDialog }, event.id)); }), dayEvents.length > 3 && (_jsxs(UIButton, { variant: "ghost", size: "sm", className: "w-full h-auto p-1 text-xs text-muted-foreground", onClick: function () {
                                                setDate(day);
                                                setView("day");
                                            }, children: ["+", dayEvents.length - 3, " more"] }))] })] }, index));
                    })] })), view === "day" && (_jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: format(date, "EEEE, MMMM d, yyyy") }), _jsx("div", { className: "space-y-2", children: dayEvents.length === 0 ? (_jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No events scheduled for today" })) : (dayEvents.map(function (event) { return (_jsxs("div", { className: "flex items-start p-3 border rounded-lg dark:border-zinc-800", children: [_jsxs("div", { className: "mr-4", children: [_jsx("div", { className: "text-sm font-medium", children: event.allDay
                                                ? "All Day"
                                                : format(event.start, "h:mm a") }), !event.allDay && (_jsx("div", { className: "text-sm text-muted-foreground", children: format(event.end, "h:mm a") }))] }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium", children: event.title }), event.description && (_jsx("div", { className: "text-sm text-muted-foreground mt-1", children: event.description })), event.location && (_jsxs("div", { className: "flex items-center text-sm text-muted-foreground mt-1", children: [_jsx(MapPin, { className: "h-3 w-3 mr-1" }), event.location] }))] }), _jsxs(UIButton, { variant: "ghost", size: "icon", onClick: function () { return openEventDialog(event); }, children: [_jsx(Pencil, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Edit" })] })] }, event.id)); })) })] })), _jsx(UIDialog, { open: dialogEvent !== null, onOpenChange: function (open) { return !open && setDialogEvent(null); }, children: _jsxs(UIDialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(UIDialogHeader, { children: [_jsx(UIDialogTitle, { children: (dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.isNew) ? "Add Event" : "Edit Event" }), _jsx(UIDialogDescription, { children: (dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.isNew)
                                        ? "Add a new event to your calendar"
                                        : "Edit the details of your event" })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(UILabel, { htmlFor: "title", children: "Title" }), _jsx(UIInput, { id: "title", placeholder: "Event title", value: (dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.title) || "", onChange: function (e) {
                                                return setDialogEvent(function (prev) {
                                                    return prev ? __assign(__assign({}, prev), { title: e.target.value }) : null;
                                                });
                                            } })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(UILabel, { htmlFor: "description", children: "Description" }), _jsx(UITextarea, { id: "description", placeholder: "Event description", value: (dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.description) || "", onChange: function (e) {
                                                return setDialogEvent(function (prev) {
                                                    return prev ? __assign(__assign({}, prev), { description: e.target.value }) : null;
                                                });
                                            } })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(UILabel, { htmlFor: "location", children: "Location" }), _jsx(UIInput, { id: "location", placeholder: "Event location", value: (dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.location) || "", onChange: function (e) {
                                                return setDialogEvent(function (prev) {
                                                    return prev ? __assign(__assign({}, prev), { location: e.target.value }) : null;
                                                });
                                            } })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(UILabel, { children: "Date & time" }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs(UIPopover, { children: [_jsx(UIPopoverTrigger, { asChild: true, children: _jsxs(UIButton, { variant: "outline", className: "w-full justify-start text-left font-normal", children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), (dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.start)
                                                                            ? format(dialogEvent.start, "PPP")
                                                                            : "Pick a date"] }) }), _jsx(UIPopoverContent, { className: "w-auto p-0", children: _jsx(UICalendar, { mode: "single", selected: dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.start, onSelect: function (date) {
                                                                        return setDialogEvent(function (prev) {
                                                                            return prev && date
                                                                                ? __assign(__assign({}, prev), { start: date, end: date }) : null;
                                                                        });
                                                                    }, initialFocus: true }) })] }) })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(UILabel, { children: "Color" }), _jsxs(UISelect, { value: (dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.color) || "sky", onValueChange: function (value) {
                                                        return setDialogEvent(function (prev) {
                                                            return prev ? __assign(__assign({}, prev), { color: value }) : null;
                                                        });
                                                    }, children: [_jsx(UISelectTrigger, { children: _jsx(UISelectValue, { placeholder: "Select color" }) }), _jsxs(UISelectContent, { children: [_jsx(UISelectItem, { value: "sky", children: "Sky" }), _jsx(UISelectItem, { value: "emerald", children: "Emerald" }), _jsx(UISelectItem, { value: "violet", children: "Violet" }), _jsx(UISelectItem, { value: "amber", children: "Amber" }), _jsx(UISelectItem, { value: "rose", children: "Rose" }), _jsx(UISelectItem, { value: "slate", children: "Slate" }), _jsx(UISelectItem, { value: "orange", children: "Orange" })] })] })] })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs(UILabel, { htmlFor: "all-day", className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", id: "all-day", checked: (dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.allDay) || false, onChange: function (e) {
                                                    return setDialogEvent(function (prev) {
                                                        return prev ? __assign(__assign({}, prev), { allDay: e.target.checked }) : null;
                                                    });
                                                }, className: "form-checkbox" }), "All day"] }) })] }), _jsxs(UIDialogFooter, { className: "gap-2 sm:gap-0", children: [!(dialogEvent === null || dialogEvent === void 0 ? void 0 : dialogEvent.isNew) && (_jsx(UIButton, { type: "button", variant: "destructive", onClick: handleDeleteEvent, children: "Delete" })), _jsx(UIDialogClose, { asChild: true, children: _jsx(UIButton, { type: "button", variant: "outline", children: "Cancel" }) }), _jsx(UIButton, { type: "button", onClick: handleSaveEvent, children: "Save" })] })] }) })] }));
}
function ChevronLeftIcon(props) {
    return (_jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "m15 18-6-6 6-6" }) })));
}
function ChevronRightIcon(props) {
    return (_jsx("svg", __assign({}, props, { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "m9 18 6-6-6-6" }) })));
}
