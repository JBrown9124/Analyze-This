from django.shortcuts import render
import sys
sys.path.insert(0, r"C:\Users\Jonathan\Documents\My_Workspaces\new_project\manage.py")
# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
def name(request):
    doc_ref = db.collection(u'users').document(u'alovelace')
    doc_ref.set({
    u'first': u'Ada',
    u'last': u'Lovelace',
    u'born': 1815
    })