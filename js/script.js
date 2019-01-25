$(function () {

    // $("#registrationform").submit(function(event) {
    //    event.preventDefault();
    //    alert("testar");
    // });



    $("form input").blur(function () {
        validateFormElements($(this));
    });

    $("form select").blur(function () {
        validateFormSelectElements($(this));
    });

    $("form select").change(function () {
        validateFormSelectElements($(this));
    });

    // functions
    function validateFormSelectElements(select) {
        if (!$(select).val() && $(select).prop("required")) {
            isInvalid(select);
        } else {
            isValid(select);
        }
    }

    function validateFormElements(input) {
        let min = 2;

        if ($(input).attr("type") === "number" && $(input).prop("required")) {

            if ($(input).data("id") === "age") {
                validateInputValue(input);
            } else {
                min = 3;
                validateInputValue(input, `Måste bestå av 1-3 antal siffror`, min);
            }
        }

        if ($(input).attr("type") === "text" && $(input).prop("required")) {

            if ($(input).data("id") === "firstName") {
                validateInputValue(input);
            } else {
                min = 2;
                validateInputValue(input, `Måste bestå av minst 2 bokstäver.`, min);
            }
        }

        if ($(input).attr("type") === "text" && $(input).prop("required")) {

            if ($(input).data("id") === "lastName") {
                validateInputValue(input);
            } else {
                min = 2;
                validateInputValue(input, `Måste bestå av minst 2 bokstäver.`, min);
            }
        }

        if ($(input).attr("type") === "email" && $(input).prop("required")) {
            validateEmail(input);
        }

        if ($(input).attr("type") === "password" && $(input).prop("required")) {
            let comparePassword = findComparePassword();

            if ($(input).data("comparewith") !== undefined) {
                validatePassword(comparePassword[0], comparePassword[1]);
            } else {
                min = 8;
                validateInputValue(input, `Måste minst innehålla ${min} antal tecken`, min);
                validatePassword(comparePassword[0], comparePassword[1]);
            }
        }

        if ($(input).attr("type") === "checkbox" && $(input).prop("required")) {
            validateCheckbox(input);
        }

        if ($(input).attr("type") === "radio" && $(input).prop("required")) {
            validateRadioButton(input);
        }

        if (!$(input).val() && !$(input).prop("required")) {
            isValid(input);
        }
    }


    function isValid(element, validClass = "is-valid", invalidClass = "is-invalid") {
        $(element).addClass(validClass);
        $(element).removeClass(invalidClass);
    }

    function isInvalid(element, validClass = "is-valid", invalidClass = "is-invalid") {
        $(element).addClass(invalidClass);
        $(element).removeClass(validClass);
    }

    function validateRadioButton(radio) {
        let $elements = $("[name='" + $(radio).attr("name") + "']");
        let checked = [];

        $elements.each(function (i, radio) {
            checked.push($(radio).prop("checked"));
        });

        if (checked.includes(true)) {
            $(elements).each(function (i, radio) {
                $(radio).removeClass("is-invalid");
            });
        } else {
            $(elements).each(function (i, radio) {
                $(radio).addClass("is-invalid");
            });
        }
    }

    function validateCheckbox(checkbox) {
        if ($(checkbox).prop("checked")) {
            $(checkbox).removeClass("is-invalid");
        } else {
            $(checkbox).addClass("is-invalid");
        }
    }

    function findComparePassword() {
        let arr = [];
        $("form input").each(function (i, input) {
            if ($(input).attr("type") === "password" && $(input).prop("required")) {
                if ($(this).data("comparewith") !== undefined) {
                    arr.push("#" + $(input).attr("id"));
                    arr.push($(input).data("comparewith"));
                }
            }
        });
        return arr;
    }

    function validatePassword(input, compareWith) {
        let invalidFeedbackId = input + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = "Lösenorden matchar inte varandra!";
        let result = ($(input).val() === $(compareWith).val()) ? true : false;

        if (!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);

        } else if (!result) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);

        } else {
            isValid(input);
        }
    }

    function validateEmail(input) {
        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = "E-postadressen är ogiltig. Ange en giltig e-postadress";
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;

        if (!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if (!regex.test($(input).val())) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);
        } else {
            isValid(input);
        }
    }

    function validateInputValue(input, error, min = 1, max = 4096) {
        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = error;

        if (!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if ($(input).val().length < min) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);
        } else {
            isValid(input);
        }
    }

    window.addEventListener("load", function () {
        var forms = document.getElementsByClassName("vform");
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener("submit", function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            }, false);
        });
    }, false);

});