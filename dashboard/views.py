from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def get_dashboard(request):
    if 'logged_first' in request.session:
        logged_first = request.session['logged_first']
    else:
        logged_first = None
    request.session['logged_first'] = False

    return render(request, 'dashboard/dashboard.html', {'logged_first': logged_first, })