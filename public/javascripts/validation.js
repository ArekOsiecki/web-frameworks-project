$('#search').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#locFrom').val() || !$('input#locTo').val()) {
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert danger">All fields required, please try again</div>');
        }
        return false;
    }
});
$('#regUser').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#userName').val() || !$('input#email').val() ||
        !$('input#book').val() || !$('input#password').val() || !$('input#pw2').val()) {
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert danger">All fields required, please try again</div>');
        }
        return false;
    }
});
$('#logUser').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#email').val() || !$('select#rating').val()) {
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert danger">All fields required, please try again</div>');
        }
        return false;
    }
});
